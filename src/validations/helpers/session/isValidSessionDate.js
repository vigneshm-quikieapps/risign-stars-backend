const { getDayIndexOfTheWeek } = require("../../../helpers/dates");
const moment = require("moment");

const isValidSessionDate = async (date, { req }) => {
  try {
    let { pattern } = req.sessionData;

    if (!pattern || pattern.length === 0) {
      throw new Error("pattern not available in session Data");
    }

    let { day } = pattern[0];
    let dayIndex = getDayIndexOfTheWeek(day);
    let providedDateIndex = moment(date).day();

    if (providedDateIndex != dayIndex) {
      throw new Error("attendance date not matching with session pattern");
    }

    return true;
  } catch (err) {
    return Promise.reject(err.message);
  }
};

module.exports = isValidSessionDate;
