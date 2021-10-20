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

  /**
   * create partial charges if required
   */
  let suspendedAtMonth = moment(suspendedAt).format("YYYY-MM-01");
  let nowMonth = moment(now).format("YYYY-MM-01");
  let monthDiff = moment(nowMonth).diff(suspendedAtMonth, "month");

  /**
   * e.g the member is marked as suspend in the month of october
   *
   * case 1.
   * if the member is marked as return from suspension on october
   * mark all future bills as "ACTIVE"
   *
   * case 2.
   * if the member is marked as return from suspension on the month greater than october (say november)
   * mark the future bills (i.e december and later) as "ACTIVE"
   * create a new bill (partial charge, if applicable) for the month of november (OR the current month OR the month in which the member is marked return from suspension)
   *
   */
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
