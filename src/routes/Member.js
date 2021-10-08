const express = require("express");
const router = express.Router();
const {
  createMemberValidationRules,
  updateMemberValidationRules,
  createEmergencyContactValidationRules,
  createMemberConsentValidationRules,
} = require("../validations/member");
const memberConsent = require("../controllers/memberConsent");
const member = require("../controllers/Member");
const validate = require("../validations/validate");

router.param("memberId", member.getmemberIdById);

/**
 * routes
 */
router.get("/", createMemberValidationRules(), member.getAllMember);
router.post("/", member.create);
router.post(
  "/consent",
  createMemberConsentValidationRules(),
  validate,
  memberConsent.create
);
router.get("/consent", memberConsent.get);
router.put("/:id", updateMemberValidationRules(), validate, member.update);
router.get("/:id", member.getEmergencyContact);
router.post(
  "/:memberId",
  createEmergencyContactValidationRules(),
  validate,
  member.addNewEmergencyContact
);
router.delete("/:id", member.delete);
router.put("/:memberId/:businessId", member.addMembership);
router.post(
  "/:memberId/image-upload",
  member.memberImageUploadHelper.single("image"),
  member.uploadImage
);

module.exports = router;
