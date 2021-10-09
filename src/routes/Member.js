const express = require("express");
const router = express.Router();
const {
  createMemberValidationRules,
  updateMemberValidationRules,
  createEmergencyContactValidationRules,
  updateEmergencyContactValidationRules,
} = require("../validations/member");

const member = require("../controllers/Member");
const validate = require("../validations/validate");
router.param("memberId", member.getmemberIdById);

router.get("/member", createMemberValidationRules(), member.getAllMember);
router.post("/member", member.create);
router.put(
  "/member/:id",
  updateMemberValidationRules(),
  validate,
  member.update
);
router.get("/member/:id", member.getEmergencyContact);
router.post(
  "/contact/:memberId",
  createEmergencyContactValidationRules(),
  validate,
  member.addNewEmergencyContact
);
router.put(
  "/contact/:memberId/update/:contactsId",
  updateEmergencyContactValidationRules(),
  validate,
  member.updateEmergencyContact
);
router.delete("/member/:id", member.delete);
router.put("/member/:memberId/:businessId", member.addMembership);
router.post(
  "/:memberId/image-upload",
  member.memberImageUploadHelper.single("image"),
  member.uploadImage
);

module.exports = router;
