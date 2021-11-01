const { ENUM_DAYS } = require("../../constants/session");

/**
 * if the dayName provided is invalid,
 * it returns -1
 */
const getDayIndexOfTheWeek = (dayName) => {
  return ENUM_DAYS.indexOf(dayName.slice(0, 3).toLowerCase());
};

module.exports = getDayIndexOfTheWeek;
