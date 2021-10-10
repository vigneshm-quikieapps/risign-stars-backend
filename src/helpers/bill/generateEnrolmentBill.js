const getMonthlyCharges = require("./getMonthlyCharges");
const { Bill } = require("../../models");
const { getMonthRange } = require("../dates");
const generateClubMembershipBillPayload = require("./generateClubMembershipBillPayload");
const generatePartialMonthBillPayload = require("./generatePartialMonthBillPayload");
const generateMonthBillPayload = require("./generateMonthBillPayload");

/**
 *
 * charge the annual club membership charge
 * generate the monthly charge in advance for the whole remaining term period
 *
 * @param {*} param0
 * @param {*} session
 */
const generateEnrolmentBill = async (
  { businessFinanceData, classData, sessionData, memberId },
  session
) => {
  let now = new Date();

  let { term, classId } = sessionData;
  let { startDate, endDate } = term;
  let { clubMembershipFee, businessId } = businessFinanceData;
  let { charges } = classData;

  /**
   * get the total no. of months from starting date to end date
   */
  let monthRange = getMonthRange(startDate, endDate);

  if (monthRange < 1) {
    throw new Error("Month range should be greater than or equal to 1");
  }

  /** get monthly charges */
  let monthlyCharges = getMonthlyCharges(charges);
  let monthlyPayload = {
    billDate: now,
    monthlyCharges,
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
  let clubMembershipPayload = { ...monthlyPayload, clubMembershipFee };
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
    dueDate: monthRange[0],
    startDate: now,
  };
  let firstMonthbillPayload =
    generatePartialMonthBillPayload(firstMonthPayload);
  billPayloads.push(firstMonthbillPayload);

  /**
   * full charge from the 2nd month onwards till last second
   */
  if (monthRange.length > 1) {
    for (let i = 1; i < monthRange.length - 1; i++) {
      let data = {
        ...monthlyPayload,
        dueDate: monthRange[i],
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
      endDate,
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
