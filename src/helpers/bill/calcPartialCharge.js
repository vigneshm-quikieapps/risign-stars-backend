const moment = require("moment");
const getNoOfSessions = require("../sessions/getNoOfSessions");

/**
 * calculates the partial charge:
 * get the no. of sessions, the member will be attending for the current month (starting from the start date)
 * get the charge
 * formulae for calculating the partial charge = (charge/4) * noOfSessionsMemberWillBeAttending
 *
 * Note:
 * client has taken the following assumptions.
 * there will be 4 weeks in a month (ignore the case of 5 weeks in a month)
 * also, there will be only 1 session in a month
 *
 * @param {*} startDate
 * @param {*} charge
 * @returns
 */
const partialCharge = ({ pattern, startDate, endDate, charge }) => {
  if (!startDate && !endDate) {
    throw new Error("At least either startDate / endDate should be in payload");
  }

  /**
   * either startDate or endDate should be provided
   */
  if (startDate && endDate) {
    throw new Error("Either startDate / endDate should be in payload");
  }

  /**
   * startDate is not provided, that means endDate should be provided.
   * use the start of the month date of the endDate as startDate
   */
  if (!startDate) {
    startDate = moment(endDate).startOf("month").toDate();
  }

  /**
   * end date is not provided, that means startDate should be provided.
   * use the end of the month of startDate as endDate
   */
  if (!endDate) {
    endDate = moment(startDate).endOf("month").toDate();
  }

  let startMonth = startDate.getMonth();
  let endMonth = endDate.getMonth();

  /**
   * since we are only handle partial charge calculation for a single month
   * start month and endmonth should be equal
   */
  if (startMonth !== endMonth) {
    throw new Error("Start date and end date should be in the same month");
  }

  let noOfSessions = getNoOfSessions({ pattern, startDate, endDate });

  console.log({ charge, noOfSessions });

  /**
   * we are considering maximum of 4 classes in a month,
   * there might month where there are 5 classes in a month
   * but if a student attends 4 classes, he should pay for the whole month
   */
  if (noOfSessions > 4) {
    noOfSessions = 4;
  }

  return (charge.amount * noOfSessions) / 4;
};

module.exports = partialCharge;
