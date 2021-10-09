const moment = require("moment");

/**
 * it generates the date of the month, year for which the bill has been generated
 *
 * date can be either Date object, date string
 * @param {*} date
 * @returns
 */
const getBillDate = (date) => {
  return moment(date).startOf("month").toISOString();
};

module.exports = getBillDate;
