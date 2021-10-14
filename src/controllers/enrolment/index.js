const newEnrolment = require("./newEnrolment");
const withdrawEnrolment = require("./withdrawEnrolment");
const transferEnrolment = require("./transferEnrolment");
const updateWaitlistEnrolment = require("./updateWaitlistEnrolment");
const trailEnrolment = require("./trailEnrolment");
const returnFromSuspensionEnrolment = require("./returnFromSuspensionEnrolment");

module.exports = {
  newEnrolment,
  returnFromSuspensionEnrolment,
  trailEnrolment,
  transferEnrolment,
  updateWaitlistEnrolment,
  withdrawEnrolment,
};
