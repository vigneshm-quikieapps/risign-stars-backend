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

  return days[day];
};

const getNoOfSessions = (startDate, endDate) => {
  if (endDate <= startDate) {
    return 0;
  }

  let pattern = "";

  /** array of days in their respective index value */
  let daysIndexArr = pattern.map(({ day }) => dayToIndex(day));

  let loopDate = new Date(startDate.getTime());

  /** count the no of sessions */
  let noOfSessions = 0;
  while (loopDate <= endDate) {
    if (daysIndexArr.includes(loopDate.getDay())) {
      /** */
      noOfSessions++;
    }

    /** increment date by 1 day */
    let newDate = loopDate.setDate(loopDate.getDate() + 1);
    loopDate = new Date(newDate);
  }

  return noOfSessions;
};

module.exports = getNoOfSessions;
