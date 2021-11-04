const newEnrolment = require("./newEnrolment");
const returnFromSuspensionEnrolment = require("./returnFromSuspensionEnrolment");
const suspendEnrolment = require("./suspendEnrolment");
const trailEnrolment = require("./trailEnrolment");
const transferEnrolment = require("./transferEnrolment");
const updateWaitlistEnrolment = require("./updateWaitlistEnrolment");
const withdrawEnrolment = require("./withdrawEnrolment");
const getAllEnrolmentOfAMemberInABusiness = require("./getAllEnrolmentOfAMemberInABusiness");

module.exports = {
  getAllEnrolmentOfAMemberInABusiness,
  newEnrolment,
  returnFromSuspensionEnrolment,
  suspendEnrolment,
  trailEnrolment,
  transferEnrolment,
  updateWaitlistEnrolment,
  withdrawEnrolment,
};
