const express = require("express");
const router = express.Router();
const {
  classTransferEnrolment,
  newEnrolment,
  transferEnrolment,
  updateWaitlistEnrolment,
  withdrawEnrolment,
  trailEnrolment,
  returnFromSuspensionEnrolment,
  getAllEnrolmentOfAMemberInABusiness,
} = require("../controllers/enrolment");
const suspendEnrolment = require("../controllers/enrolment/suspendEnrolment");
const { isAuthorized } = require("../middlewares/auth");
const {
  createEnrolementValidationRules,
  withdrawEnrolmentValidationRules,
  updateWaitlistEnrolmentValidationRules,
  sessionTransferEnrolmentValidationRules,
  trialEnrolmentValidationRules,
  suspendEnrolmentValidationRules,
  returnFromSuspensionEnrolmentValidationRules,
  getAllEnrolmentOfAMemberInABusinessValidationRules,
  classTransferEnrolmentValidationRules,
} = require("../validations/enrolment");
const validate = require("../validations/validate");
const validateSingle = require("../validations/validateSingle");

/** routes */
router.post(
  "/",
  isAuthorized(null, null),
  createEnrolementValidationRules(),
  validate,
  newEnrolment
);

router.post(
  "/of-a-member-in-a-business",
  getAllEnrolmentOfAMemberInABusinessValidationRules(),
  validate,
  getAllEnrolmentOfAMemberInABusiness
);

router.post(
  "/:enrolmentId/withdraw",
  withdrawEnrolmentValidationRules(),
  validate,
  withdrawEnrolment
);

router.post(
  "/:enrolmentId/return-from-suspension",
  returnFromSuspensionEnrolmentValidationRules(),
  validate,
  returnFromSuspensionEnrolment
);

router.post(
  "/:enrolmentId/suspend",
  suspendEnrolmentValidationRules(),
  validate,
  suspendEnrolment
);

router.post(
  "/update-waitlist",
  updateWaitlistEnrolmentValidationRules(),
  validate,
  updateWaitlistEnrolment
);

/**
 * session transfer
 */
router.post(
  "/transfer",
  sessionTransferEnrolmentValidationRules(),
  validate,
  transferEnrolment
);

/**
 * session transfer
 */
router.post(
  "/class-transfer",
  classTransferEnrolmentValidationRules(),
  validate,
  classTransferEnrolment
);

router.post(
  "/trial",
  trialEnrolmentValidationRules(),
  validate,
  trailEnrolment
);

module.exports = router;
