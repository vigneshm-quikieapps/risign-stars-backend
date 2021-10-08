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
const partialCharge = (startDate, charge) => {
  let startMonth = startDate.getMonth();
  let currentMonth = new Date().getMonth();
  if (startMonth !== currentMonth) {
    throw new Error("Start date should be in the current month");
  }

  let endDate = moment(startDate).endOf("month").toISOString();
  let noOfSessions = getNoOfSessions(startDate, endDate);
  return (charge / 4) * noOfSessions;
};

module.exports = partialCharge;
