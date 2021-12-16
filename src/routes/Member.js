const express = require("express");
const router = express.Router();
const {
  createMemberValidationRules,
  updateMemberValidationRules,
  createEmergencyContactValidationRules,
  updateEmergencyContactValidationRules,
} = require("../validations/member");
const memberConsent = require("../controllers/memberConsent");
const member = require("../controllers/Member");
const { getAllEnrolmentsOfAMember } = require("../controllers/enrolment");
const validate = require("../validations/validate");
const { isAuthorized } = require("../middlewares/auth");
const { getAllProgressOfAMember } = require("../controllers/progress");
const { getBillStatusOfMembersInASession } = require("../controllers/bill");
const { UPDATE, CREATE } = require("../constants/rest");
const { MEMBERS } = require("../constants/pages");
const isAuthHandlerFromParams = require("../middlewares/auth/utils/isAuthHandlerFromParams");
const isAuthHandlerByUserIdFromBody = require("../middlewares/auth/utils/isAuthHandlerByUserIdFromBody");

// router.param("memberId", member.getmemberIdById);

/**
 * routes
 */
router.get("/", member.getAllMember);
router.get(
  "/of-a-logged-in-user",
  isAuthorized(null, null),
  member.getAllMemberOfALoggedInUser
);

router.get(
  "/of-a-logged-in-parent",
  isAuthorized(null, null),
  member.getAllMemberOfALoggedInParent
);

router.post("/bill-status-in-a-session", getBillStatusOfMembersInASession);

router.get("/:memberId", member.get);
router.get("/:memberId/progress", getAllProgressOfAMember);
router.get("/:memberId/enrolments", getAllEnrolmentsOfAMember);

router.post(
  "/",
  isAuthorized(null, null),
  createMemberValidationRules(),
  validate,
  member.create
);
router.get("/consent", memberConsent.get);

router.put(
  "/:memberId",
  isAuthorized(null, null),
  updateMemberValidationRules(),
  validate,
  member.update
);
router.get("/:memberId/emergency-contact", member.getEmergencyContact);

router.post(
  "/:memberId",
  isAuthorized(null, null),
  createEmergencyContactValidationRules(),
  validate,
  member.addNewEmergencyContact
);

router.put(
  "/contact/:memberId/update/:contactsId",
  isAuthorized(null, null),
  updateEmergencyContactValidationRules(),
  validate,
  member.updateEmergencyContact
);

router.delete("/member/:memberId", isAuthorized(null, null), member.delete);

router.put(
  "/member/:memberId/:businessId",
  isAuthorized(null, null),
  member.addMembership
);

router.post(
  "/:memberId/image-upload",
  isAuthorized(null, null),
  member.memberImageUploadHelper.single("image"),
  member.uploadImage
);

module.exports = router;
