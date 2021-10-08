const moment = require("moment");

/**
 * it returns the number of months during the specified period
 *
 * e.g:
 * dateRange('2013-11-05', '2014-02-17')
 *
 * output:
 * [
 *  "2013-11-01",
 *  "2013-12-01",
 *  "2014-01-01",
 *  "2014-02-01",
 * ]
 *
 * @param {*} startDate
 * @param {*} endDate
 * @returns
 */
const getMonthRange = (startDateParam, endDateParam) => {
  let startDate = moment(new Date(startDateParam.toISOString()));
  let endDate = moment(new Date(endDateParam.toISOString()));

  var result = [];

  if (endDate.isBefore(startDate)) {
    throw "End date must be greated than start date.";
  }

  while (startDate.isBefore(endDate)) {
    result.push(startDate.format("YYYY-MM-01"));
    startDate.add(1, "month");
  }

  return result;
};

module.exports = getMonthRange;
