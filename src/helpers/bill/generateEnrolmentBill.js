const getMonthlyCharges = require("./getMonthlyCharges");
const { Bill } = require("../../models");
const generateClubMembershipBillPayload = require("./generateClubMembershipBillPayload");
const generatePartialMonthBillPayload = require("./generatePartialMonthBillPayload");
const generateMonthBillPayload = require("./generateMonthBillPayload");
const { getEnrolableMonthRange } = require("../dates");

/**
 * Only Monthly charge is handled,
 * if annual charge should be added in payPrefrequency, the logic of generating the bill should be updated.
 *
 * generate the monthly charge in advance for the whole remaining term period
 *
 * @param {*} param0
 * @param {*} session
 */
const generateEnrolmentBill = async (
  { businessFinanceData, classData, sessionData, memberData, clubMembershipId },
  session
) => {
  let now = new Date();

  let { term, classId, pattern } = sessionData;
  let { startDate, endDate } = term;
  let { charges: businessFinanceCharges, businessId } = businessFinanceData;
  let classCharges = classData.charges;
  let memberId = memberData._id;

  /**
   * get the total no. of months from starting date to end date, the member can attend in the session
   */
  let monthRange = getEnrolableMonthRange(startDate, endDate, now);

  if (monthRange < 1) {
    throw new Error("Month range should be greater than or equal to 1");
  }

  /** get monthly charges */
  let monthlyCharges = getMonthlyCharges(classCharges);
  let annualPayload = {
    clubMembershipId,
    generatedAt: now,
    memberId,
    businessId,
  };
  let monthlyPayload = {
    clubMembershipId,
    generatedAt: now,
    charges: monthlyCharges,
    memberId,
    businessId,
    classId,
  };

  /**
   * generate the bills
   */
  let billPayloads = [];

  /**
   * generate upfront charges for club membership fee
   */
  let clubMembershipPayload = {
    ...annualPayload,
    charges: businessFinanceCharges,
    dueDate: now,
    billDate: now,
  };
  let clubMembershipBillPayload = generateClubMembershipBillPayload(
    clubMembershipPayload
  );
  billPayloads.push(clubMembershipBillPayload);

  /**
   * since 1st might not be whole month:
   * partial charge for 1st month: (should be calculated from now to last date of the current month)
   */
  let firstMonthPayload = {
    ...monthlyPayload,
    dueDate: now,
    billDate: now,
    startDate: now,
  };
  let firstMonthbillPayload = generatePartialMonthBillPayload({
    ...firstMonthPayload,
    pattern,
  });
  billPayloads.push(firstMonthbillPayload);

  /**
   * full charge from the 2nd month onwards till last second
   */
  if (monthRange.length > 1) {
    for (let i = 1; i < monthRange.length - 1; i++) {
      let data = {
        ...monthlyPayload,
        dueDate: monthRange[i],
        billDate: monthRange[i],
      };
      const billPayload = generateMonthBillPayload(data);
      billPayloads.push(billPayload);
    }

    /**
     * since last month might not be whole month:
     * partial charge for last month: (should be calculated from last month start date to end date of term)
     */
    let lastMonthPayload = {
      ...monthlyPayload,
      dueDate: monthRange[monthRange.length - 1],
      billDate: monthRange[monthRange.length - 1],
      endDate,
      pattern,
    };
    let lastMonthbillPayload =
      generatePartialMonthBillPayload(lastMonthPayload);
    billPayloads.push(lastMonthbillPayload);
  }

  /**
   * create the bill
   */
  await Bill.create(billPayloads, session);
};

module.exports = generateEnrolmentBill;
