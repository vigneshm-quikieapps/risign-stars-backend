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
 * @param {Date} startDate
 * @param {Date} endDate
 * @returns
 */
const getMonthRange = (startDateParam, endDateParam) => {
  let startDate = moment(new Date(startDateParam.toISOString()));
  let endDate = moment(new Date(endDateParam.toISOString()));

  var result = [];

  if (endDate.isBefore(startDate)) {
    throw new Error("End date must be greater than start date");
  }

  /**
   * setting the date to the 1st of the month
   * if not done, the output month range will return unexpected results.
   *
   * e.g
   * if today is 2021/10/19
   * start date of a session is 2021/09/01
   * end date of a session is 2021/12/15
   *
   * case 1.
   * now, if we don't set the date to 1st of the month
   * the output will be ['2021-10-01', '2021-11-01']
   * which is the unexpected result/output
   *
   * case 2.
   * now, if we set the date to 1st of the month
   * the output will be ['2021-10-01', '2021-11-01', '2021-12-01']
   * which is the expected result/output
   *
   */
  startDate.set("date", 1);

  while (startDate.isBefore(endDate)) {
    result.push(startDate.format("YYYY-MM-01"));
    startDate.add(1, "month");
  }

  return result;
};

module.exports = getMonthRange;
