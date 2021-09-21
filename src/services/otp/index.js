const generate = require("./generate");
const verify = require("./verify");
const constants = require("./constants");

/**
 *
 * OTP
 */
module.exports = {
  generate,
  verify,
  ...constants,
};
