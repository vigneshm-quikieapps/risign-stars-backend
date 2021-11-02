const express = require("express");
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
router.delete("/:businessSessionId", deleteBusinessSession);

//update route
router.put(
  "/:businessSessionId",
  updateSessionValidationRules(),
  validate,
  updateBusinessSession
);
//listing route

module.exports = router;
