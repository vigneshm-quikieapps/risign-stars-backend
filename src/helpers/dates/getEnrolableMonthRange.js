const moment = require("moment");
const getMonthRange = require("./getMonthRange");

/**
 * if startDate has already past
 * the startDate will be next session
 * else startDate will be the startDate/first day of the session
 *
 * @param {Date} startDate
 * @param {Date} endDate
 * @param {Date} now
 * @returns
 */
const getEnrolableMonthRange = (startDate, endDate, now) => {
  if (moment(now).isAfter(moment(startDate))) {
    startDate = now;
  }

  return getMonthRange(startDate, endDate);
};

module.exports = getEnrolableMonthRange;
