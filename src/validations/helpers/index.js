const business = require("./business");
const category = require("./category");
const classes = require("./class");
const discount = require("./discount");
const coach = require("./coach");
const enrolment = require("./enrolment");
const evaluationScheme = require("./evaluationScheme");
const members = require("./member");
const mobileNo = require("./mobileNo");
const session = require("./session");
const term = require("./term");

module.exports = {
  ...business,
  ...category,
  ...classes,
  ...coach,
  ...discount,
  ...enrolment,
  ...evaluationScheme,
  ...members,
  ...mobileNo,
  ...session,
  ...term,
};
