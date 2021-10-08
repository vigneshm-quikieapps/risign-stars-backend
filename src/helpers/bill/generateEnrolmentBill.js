const { Bill, BusinessClass } = require("../../models");
const { getMonthRange } = require("../dates");
const generateFirstMonthBillPayload = require("./generateFirstMonthBillPayload");
const generateMonthBillPayload = require("./generateMonthBillPayload");

const generateEnrolmentBill = async (req, session) => {
  /**
   * charge the annual club membership charge
   * generate the monthly charge in advance for the whole remaining term period
   */

  /**
   * get the start date
   */
  let { classId } = req.businessSessionData;
  let classData = BusinessClass.findById(classId);
  let { charges } = classData;

  /**
   * get the total no. of months from starting date to end date
   */
  let startDate = "";
  let endDate = "";
  let monthRange = getMonthRange(startDate, endDate);

  /**
   * generate the bills
   */
  let billPayloads = [];

  /**
   * partial charge for 1st month
   */
  let billPayload = generateFirstMonthBillPayload({ startDate, charges });
  billPayloads.push(billPayload);

  /**
   * full charge from the 2nd month onwards
   */
  if (monthRange.length > 1) {
    for (let i = 1; i < monthRange.length; i++) {
      const billPayload = generateMonthBillPayload({ charges });
      billPayloads.push(billPayload);
    }
  }

  await Bill.create(billPayloads, session);
};

module.exports = generateEnrolmentBill;
