const moment = require("moment");

function dateToString(date) {
  return moment(date).format("YYYY-MM-DD");
}

module.exports = dateToString;
