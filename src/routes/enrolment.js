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
const { Member } = require("../models");
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
const UnauthorizedError = require("../exceptions/UnauthorizedError");

const isAuthHandler = async (req, res) => {
  const memberId = req.body.memberId;
  const member = await Member.findById(memberId);
  if (req.tokenData._id !== member.userId) {
    throw new UnauthorizedError();
  }
  return true;
};
/** routes */
router.post(
  "/",
  isAuthorized(null, null, { isAuthHandler }),
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
  isAuthorized(null, null),
  withdrawEnrolmentValidationRules(),
  validate,
  withdrawEnrolment
);

router.post(
  "/:enrolmentId/return-from-suspension",
  isAuthorized(null, null),
  returnFromSuspensionEnrolmentValidationRules(),
  validate,
  returnFromSuspensionEnrolment
);

router.post(
  "/:enrolmentId/suspend",
  isAuthorized(null, null),
  suspendEnrolmentValidationRules(),
  validate,
  suspendEnrolment
);

router.post(
  "/update-waitlist",
  isAuthorized(null, null),
  updateWaitlistEnrolmentValidationRules(),
  validate,
  updateWaitlistEnrolment
);

/**
 * session transfer
 */
router.post(
  "/transfer",
  isAuthorized(null, null),
  sessionTransferEnrolmentValidationRules(),
  validate,
  transferEnrolment
);

/**
 * class transfer
 */
router.post(
  "/class-transfer",
  isAuthorized(null, null),
  classTransferEnrolmentValidationRules(),
  validate,
  classTransferEnrolment
);

router.post(
  "/trial",
  isAuthorized(null, null),
  trialEnrolmentValidationRules(),
  validate,
  trailEnrolment
);

module.exports = router;
