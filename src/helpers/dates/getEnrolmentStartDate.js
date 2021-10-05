const { getNextDayOfTheWeek } = require("./getNextDayOfTheWeek");

/**
 * get the start date for an enrolment
 * @param {*} req
 * @returns
 */
const getEnrolmentStartDate = ({ pattern, term }) => {
  let { startDate } = term;

  let now = new Date();

  /**
   * if startDate is in the future
   * in other words the session has not yet started
   */
  if (startDate > now) {
    return startDate;
  }

  /**
   * if startDate is in the past
   * in other words the session has already started
   */
  let days = pattern.map(({ day }) => day);

  /**
   * get next dates for the session
   * pick the earliest session as enrolmentStartDate
   */
  let nextDates = days.map((day) => getNextDayOfTheWeek(day));
  let enrolmentStartDate = nextDates.reduce((a, b) => (a < b ? a : b));
  return enrolmentStartDate;
};

module.exports = getEnrolmentStartDate;
