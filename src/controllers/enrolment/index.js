const newEnrolment = require("./newEnrolment");
const returnFromSuspensionEnrolment = require("./returnFromSuspensionEnrolment");
const suspendEnrolment = require("./suspendEnrolment");
const trailEnrolment = require("./trailEnrolment");
const transferEnrolment = require("./transferEnrolment");
const updateWaitlistEnrolment = require("./updateWaitlistEnrolment");
const withdrawEnrolment = require("./withdrawEnrolment");
const getAllEnrolmentOfAMemberInABusiness = require("./getAllEnrolmentOfAMemberInABusiness");
const classTransferEnrolment = require("./classTransferEnrolment");

module.exports = {
  classTransferEnrolment,
  getAllEnrolmentOfAMemberInABusiness,
  newEnrolment,
  returnFromSuspensionEnrolment,
  suspendEnrolment,
  trailEnrolment,
  transferEnrolment,
  updateWaitlistEnrolment,
  withdrawEnrolment,
};
