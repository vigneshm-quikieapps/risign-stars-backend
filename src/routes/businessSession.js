const express = require("express");
const { SESSION_DEFINITION } = require("../constants/pages");
const { CREATE, UPDATE, DELETE } = require("../constants/rest");
const router = express.Router();

const {
  getBusinessSession,
  createBusinessSession,
  updateBusinessSession,
  deleteBusinessSession,
  getMembersInASession,
  getSessionsInAClassOfAParticularTerm,
} = require("../controllers/businessSession");
const { updateWaitlistEnrolment } = require("../controllers/enrolment");
const { isAuthorized } = require("../middlewares/auth");
const getResourceBusinessIdForSession = require("../middlewares/auth/utils/getResourceBusinessId/getResourceBusinessIdForSession");
const getResourceBusinessIdBySessionId = require("../middlewares/auth/utils/getResourceBusinessId/getResourceBusinessIdBySessionId");
const {
  updateSessionValidationRules,
  createSessionValidationRules,
  getSessionsInAClassOfAParticularTermValidationRules,
} = require("../validations/businessSession");
const validate = require("../validations/validate");

/**
 * all of actual routes
 */
//create route
router.post(
  "/",
  isAuthorized(SESSION_DEFINITION, CREATE, {
    getResourceBusinessId: getResourceBusinessIdForSession,
  }),
  createSessionValidationRules(),
  validate,
  createBusinessSession
);

router.get("/:businessSessionId/members", getMembersInASession);
router.get(
  "/:businessSessionId/update-waitlist-enrolments",
  updateWaitlistEnrolment
);

router.post(
  "/in-a-class/of-a-particular-term",
  getSessionsInAClassOfAParticularTermValidationRules(),
  validate,
  getSessionsInAClassOfAParticularTerm
);
// read routes
router.get("/:businessSessionId", getBusinessSession);

//delete route
router.delete(
  "/:businessSessionId",
  isAuthorized(SESSION_DEFINITION, DELETE, {
    getResourceBusinessId: getResourceBusinessIdBySessionId,
  }),
  deleteBusinessSession
);

//update route
router.put(
  "/:businessSessionId",
  isAuthorized(SESSION_DEFINITION, UPDATE, {
    getResourceBusinessId: getResourceBusinessIdBySessionId,
  }),
  updateSessionValidationRules(),
  validate,
  updateBusinessSession
);
//listing route

module.exports = router;
