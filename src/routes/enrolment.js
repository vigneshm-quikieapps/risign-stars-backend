const express = require("express");
const router = express.Router();
const {
  newEnrolment,
  transferEnrolment,
  updateWaitlistEnrolment,
  withdrawEnrolment,
  trailEnrolment,
  returnFromSuspensionEnrolment,
  getAllEnrolmentOfAMemberInABusiness,
} = require("../controllers/enrolment");
const suspendEnrolment = require("../controllers/enrolment/suspendEnrolment");
const {
  createEnrolementValidationRules,
  withdrawEnrolmentValidationRules,
  updateWaitlistEnrolmentValidationRules,
  classTransferEnrolmentValidationRules,
  trialEnrolmentValidationRules,
  suspendEnrolmentValidationRules,
  returnFromSuspensionEnrolmentValidationRules,
  getAllEnrolmentOfAMemberInABusinessValidationRules,
} = require("../validations/enrolment");
const validate = require("../validations/validate");

/** routes */
router.post("/", createEnrolementValidationRules(), validate, newEnrolment);

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
router.post(
  "/transfer",
  classTransferEnrolmentValidationRules(),
  validate,
  transferEnrolment
);
router.post(
  "/trial",
  trialEnrolmentValidationRules(),
  validate,
  trailEnrolment
);

module.exports = router;
