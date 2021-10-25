const sessionTransferEnrolmentPayloadRequest = require("./sessionTransferEnrolmentPayloadRequest");
const sessionTransferfunctionality = require("./sessionTransferFunctionality");
const sessionTransferprogressPayloadRequest = require("./sessionTransferprogressPayloadRequest");
const regularEnrolment = require("./regularEnrolment");
const enrolmentPayloadRequest = require("./enrolmentPayloadRequest");
const progressPayloadRequest = require("./progressPayloadRequest");
const getClubMembershipId = require("./getClubMembershipId");
const waitlistEnrolInASession = require("./waitlistedEnrolment");
const newEnrolmentHandler = require("./newEnrolmentHandler");
const trialEnrolmentHandler = require("./trialEnrolmentHandler");
const nonTrialEnrolmentHandler = require("./nonTrialEnrolmentHandler");

module.exports = {
  sessionTransferEnrolmentPayloadRequest,
  sessionTransferfunctionality,
  sessionTransferprogressPayloadRequest,
  regularEnrolment,
  getClubMembershipId,
  enrolmentPayloadRequest,
  progressPayloadRequest,
  waitlistEnrolInASession,
  newEnrolmentHandler,
  trialEnrolmentHandler,
  nonTrialEnrolmentHandler,
};
