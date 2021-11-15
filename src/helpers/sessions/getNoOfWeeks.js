let moment = require("moment");

/**
 * Sunday - Saturday : 0 - 6
 *
 * @param {*} startDate
 * @param {*} endDate
 * @returns
 */
const dayToIndex = (day) => {
  const days = {
    sun: 0,
    mon: 1,
    tue: 2,
    wed: 3,
    thu: 4,
    fri: 5,
    sat: 6,
  };

  let dayLowerCase = day.toLowerCase();
  return days[dayLowerCase];
};

/**
 * get the no. of weeks from startDate to endDate
 * @param {*} param0
 * @returns
 */
const getNoOfWeeks = ({ pattern, startDate, endDate }) => {
  if (endDate <= startDate) {
    return 0;
  }

  /** array of days in their respective index value */
  let daysIndexArr = pattern.map(({ day }) => dayToIndex(day));

  /**
   *
   */
  let loopDate = new Date(startDate.getTime());

  /**
   * count the no of weeks
   */
  let noOfWeeks = 0;
  let weekNumber = -1;
  let weekCounted = false;
  while (loopDate <= endDate) {
    let dateWeekNumber = parseInt(moment(loopDate).format("w"));
    if (weekNumber != dateWeekNumber) {
      if (daysIndexArr.includes(loopDate.getDay())) {
        if (!weekCounted) {
          weekCounted = true;
          noOfWeeks++;
        }
      }
    } else {
      weekCounted = false;
    }

    /** increment date by 1 day */
    let newDate = loopDate.setDate(loopDate.getDate() + 1);
    loopDate = new Date(newDate);
  }

  return noOfWeeks;
};

module.exports = getNoOfWeeks;
