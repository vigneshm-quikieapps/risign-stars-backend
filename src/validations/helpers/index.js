const business = require("./business");
const classes = require("./classes");
const members = require("./members");
const term = require("./term");
const evaluationScheme = require("./evaluationScheme");

module.exports = {
  ...business,
  ...classes,
  ...members,
  ...term,
  ...evaluationScheme,
};
