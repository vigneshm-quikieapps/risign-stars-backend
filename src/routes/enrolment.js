const express = require("express");
const router = express.Router();
const {
  newEnrolment,
  transferEnrolment,
  updateWaitlistEnrolment,
  withdrawEnrolment,
  trailEnrolment,
} = require("../controllers/enrolment");
const {
  createEnrolementValidationRules,
  withdrawEnrolmentValidationRules,
  updateWaitlistEnrolmentValidationRules,
  classTransferEnrolmentValidationRules,
  trialEnrolmentValidationRules,
} = require("../validations/enrolment");
const validate = require("../validations/validate");

/** routes */
router.post("/", createEnrolementValidationRules(), validate, newEnrolment);
router.post(
  "/:enrolmentId/withdraw",
  withdrawEnrolmentValidationRules(),
  validate,
  withdrawEnrolment
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

// router.get("/enrolement", enrolement.getAll);
// router.put("/enrolement/consent/:id",putEnrolementConsentValidationRules(),validate, enrolement.updateConsent);
// router.get("/enrolement/consent/:id", enrolement.getConsent);
// router.put("/enrolement/AdditionalSection/:id",putEnrolementAdditionalValidationRules(),validate, enrolement.updateAdditionalSection);
// router.get("/enrolement/AdditionalSection/:id", enrolement.getAdditionalSection);

module.exports = router;
