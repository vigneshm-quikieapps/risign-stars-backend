const express = require("express")
const router = express.Router();

const enrolement = require("../controllers/enrolement");
const { createEnrolementValidationRules, putEnrolementConsentValidationRules, putEnrolementAdditionalValidationRules } = require("../validations/enrolement");
const validate = require("../validations/validate");

router.post("/enrolement",createEnrolementValidationRules(),validate, enrolement.create);
router.get("/enrolement", enrolement.getAll);
router.put("/enrolement/consent/:id",putEnrolementConsentValidationRules(),validate, enrolement.updateConsent);
router.get("/enrolement/consent/:id", enrolement.getConsent);
router.put("/enrolement/AdditionalSection/:id",putEnrolementAdditionalValidationRules(),validate, enrolement.updateAdditionalSection);
router.get("/enrolement/AdditionalSection/:id", enrolement.getAdditionalSection);




module.exports = router;