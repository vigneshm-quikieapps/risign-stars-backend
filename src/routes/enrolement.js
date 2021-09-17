const express = require("express")
const router = express.Router();

const enrolement = require("../controllers/enrolement");
const { createEnrolementValidationRules, putEnrolementConsentValidationRules, putEnrolementAdditionalValidationRules } = require("../validations/enrolement");
const validate = require("../validations/validate");

router.post("/enrolement", enrolement.create);
router.get("/enrolement", enrolement.getAll);
router.put("/enrolement/consent/:id", enrolement.updateConsent);
router.get("/enrolement/consent/:id", enrolement.getConsent);
router.put("/enrolement/AdditionalSection/:id", enrolement.updateAdditionalSection);
router.get("/enrolement/AdditionalSection/:id", enrolement.getAdditionalSection);
router.put("/enrolement/registration/:enrolementId/:sessionId",enrolement.updateRegistration,enrolement.updateSessionCapacity,enrolement.updateRegistration);




module.exports = router;