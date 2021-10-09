/**
 * get the date of the next specific day
 * e.g
 * 1. get next monday
 * 2. get next saturday
 *
 * @param {*} dayName
 * @param {*} excludeToday
 * @param {*} refDate
 * @returns
 */
function getNextDayOfTheWeek(
  dayName,
  excludeToday = true,
  refDate = new Date()
) {
  const dayOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"].indexOf(
    dayName.slice(0, 3).toLowerCase()
  );
  if (dayOfWeek < 0) return;
  refDate.setHours(0, 0, 0, 0);
  refDate.setDate(
    refDate.getDate() +
      +!!excludeToday +
      ((dayOfWeek + 7 - refDate.getDay() - +!!excludeToday) % 7)
  );
  return refDate;
}

module.exports = getNextDayOfTheWeek;
