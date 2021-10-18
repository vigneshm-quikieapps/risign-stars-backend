const { Bill } = require("../../models");
const moment = require("moment");
const generatePartialMonthBillPayload = require("./generatePartialMonthBillPayload");
const getMonthlyCharges = require("./getMonthlyCharges");
const { STATUS_ACTIVE } = require("../../constants/bill");

const activateAllFutureBills = async (data, session) => {
  let { memberId, sessionData, classData, enrolmentData, now } = data;
  let { charges } = classData;
  let { classId, term, pattern } = sessionData;
  let { startDate } = term;
  let { suspendedAt, clubMembershipId, businessId } = enrolmentData;

  let returnNow = new Date();
  let nextMonth = new Date("2021-11-11");
  now = nextMonth;

  /**
   * create partial charges if required
   */
  console.log({ now, suspendedAt: new Date(suspendedAt) });
  let suspendedAtMonth = moment(suspendedAt).format("YYYY-MM-01");
  let nowMonth = moment(now).format("YYYY-MM-01");
  let monthDiff = moment(nowMonth).diff(suspendedAtMonth, "month");

  console.log({ monthDiff });
  if (monthDiff >= 1) {
    let monthlyCharges = getMonthlyCharges(charges);

    /** start date will the upcoming session date */
    startDate = now;

    let partialMonthData = {
      pattern,
      charges: monthlyCharges,
      startDate,
      generatedAt: now,
      clubMembershipId,
      memberId,
      classId,
      businessId,
      dueDate: now,
      billDate: now,
    };

    let partialMonthPayload = generatePartialMonthBillPayload(partialMonthData);
    await Bill.create([partialMonthPayload], { session });
  }

  /**
   * mark all future bills as "RETURN_FROM_SUSPENSION"
   */
  let condition = {
    memberId,
    classId,
    billDate: { $gt: now },
  };

  let updateData = {
    $set: { status: STATUS_ACTIVE },
  };
  await Bill.updateMany(condition, updateData).session(session);
};

module.exports = activateAllFutureBills;
