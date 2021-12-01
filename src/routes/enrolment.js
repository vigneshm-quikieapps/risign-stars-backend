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
//const validateSingle = require("../validations/validateSingle");
//const UnauthorizedError = require("../exceptions/UnauthorizedError");
const { CLASS_ENROLMENT } = require("../constants/pages");
const isAuthHandler = require("../middlewares/auth/utils/isAuthHandler");
const isAuthHandlerByEnrolementId = require("../middlewares/auth/utils/isAuthHandlerByEnrolementId");
const { CREATE, UPDATE } = require("../constants/rest");
const getResourceBusinessIdBySession = require("../middlewares/auth/utils/getResourceBusinessId/getResourceBusinessIdBySession");
const getResourceBusinessIdByEnrollmentId = require("../middlewares/auth/utils/getResourceBusinessId/getResourceBusinessIdByEnrollmentId");
const isAuthHandlerByEnrolementIdFromBody = require("../middlewares/auth/utils/isAuthHandlerByEnrolementIdFromBody");
const getResourceBusinessIdByEnrollmentIdFromBody = require("../middlewares/auth/utils/getResourceBusinessId/getResourceBusinessIdByEnrollmentIdFromBody");

/** routes */
router.post(
  "/",
  isAuthorized(CLASS_ENROLMENT, CREATE, {
    getResourceBusinessId: getResourceBusinessIdBySession,
    isAuthHandler,
  }),
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
  isAuthorized(CLASS_ENROLMENT, UPDATE, {
    getResourceBusinessId: getResourceBusinessIdByEnrollmentId,
    isAuthHandler: isAuthHandlerByEnrolementId,
  }),
  withdrawEnrolmentValidationRules(),
  validate,
  withdrawEnrolment
);

router.post(
  "/:enrolmentId/return-from-suspension",
  isAuthorized(CLASS_ENROLMENT, UPDATE, {
    getResourceBusinessId: getResourceBusinessIdByEnrollmentId,
    isAuthHandler: isAuthHandlerByEnrolementId,
  }),
  returnFromSuspensionEnrolmentValidationRules(),
  validate,
  returnFromSuspensionEnrolment
);

router.post(
  "/:enrolmentId/suspend",
  isAuthorized(CLASS_ENROLMENT, UPDATE, {
    getResourceBusinessId: getResourceBusinessIdByEnrollmentId,
    isAuthHandler: isAuthHandlerByEnrolementId,
  }),
  suspendEnrolmentValidationRules(),
  validate,
  suspendEnrolment
);
//ALLOW BUSSINESS ADMIN ONLY, note: i didnt find this route in postman docs soo not restricted the user
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
  isAuthorized(CLASS_ENROLMENT, UPDATE, {
    getResourceBusinessId: getResourceBusinessIdByEnrollmentIdFromBody,
    isAuthHandler: isAuthHandlerByEnrolementIdFromBody,
  }),
  sessionTransferEnrolmentValidationRules(),
  validate,
  transferEnrolment
);

/**
 * class transfer
 */
//ALLOW BUSSINESS ADMIN ONLY, note: i didnt find this route in postman docs soo not restricted the user
router.post(
  "/class-transfer",
  isAuthorized(null, null),
  classTransferEnrolmentValidationRules(),
  validate,
  classTransferEnrolment
);
router.post(
  "/trial",
  isAuthorized(null, null, {
    isAuthHandler,
  }),
  trialEnrolmentValidationRules(),
  validate,
  trailEnrolment
);

module.exports = router;
