function endOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

module.exports = endOfMonth;
