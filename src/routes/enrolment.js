const express = require("express");
const router = express.Router();

const {
  newEnrolment,
  transferEnrolment,
  updateWaitlistEnrolment,
  withdrawEnrolment,
} = require("../controllers/enrolment");
const {
  createEnrolementValidationRules,
  withdrawEnrolmentValidationRules,
  updateWaitlistEnrollment,
  classTransferValidation,
} = require("../validations/enrolment");

const validate = require("../validations/validate");

router.post("/", createEnrolementValidationRules(), validate, newEnrolment);
router.post(
  "/:enrolmentId/withdraw",
  withdrawEnrolmentValidationRules(),
  validate,
  withdrawEnrolment
);
router.post("/update-waitlist", validate, updateWaitlistEnrolment);
router.post("/transfer", validate, transferEnrolment);

// router.get("/enrolement", enrolement.getAll);
// router.put("/enrolement/consent/:id",putEnrolementConsentValidationRules(),validate, enrolement.updateConsent);
// router.get("/enrolement/consent/:id", enrolement.getConsent);
// router.put("/enrolement/AdditionalSection/:id",putEnrolementAdditionalValidationRules(),validate, enrolement.updateAdditionalSection);
// router.get("/enrolement/AdditionalSection/:id", enrolement.getAdditionalSection);

module.exports = router;
