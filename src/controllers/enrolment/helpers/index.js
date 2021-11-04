const classTransferEnrolmentPayloadRequest = require("./classTransferEnrolmentPayloadRequest");
const classTransferfunctionality = require("./classTransferFunctionality");
const classTransferprogressPayloadRequest = require("./classTransferprogressPayloadRequest");
const regularEnrolment = require("./regularEnrolment");
const enrolmentPayloadRequest = require("./enrolmentPayloadRequest");
const progressPayloadRequest = require("./progressPayloadRequest");
const getClubMembershipId = require("./getClubMembershipId");
const waitlistEnrolInASession = require("./waitlistedEnrolment");
const newEnrolmentHandler = require("./newEnrolmentHandler");
const trialEnrolmentHandler = require("./trialEnrolmentHandler");
const nonTrialEnrolmentHandler = require("./nonTrialEnrolmentHandler");

module.exports = {
  classTransferEnrolmentPayloadRequest,
  classTransferfunctionality,
  classTransferprogressPayloadRequest,
  regularEnrolment,
  getClubMembershipId,
  enrolmentPayloadRequest,
  progressPayloadRequest,
  waitlistEnrolInASession,
  newEnrolmentHandler,
  trialEnrolmentHandler,
  nonTrialEnrolmentHandler,
};
