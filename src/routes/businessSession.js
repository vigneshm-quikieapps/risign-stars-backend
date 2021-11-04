const express = require("express");
const router = express.Router();

//const deleteBusinessActivityValidationRules= require("../validations/businessActivityClass")

const {
  getBusinessSessionIdById,
  getBusinessSession,
  createBusinessSession,
  updateBusinessSession,
  deleteBusinessSession,
  getMembersInASession,
} = require("../controllers/businessSession");
const {
  updateSessionValidationRules,
  createSessionValidationRules,
} = require("../validations/businessSession");
const validate = require("../validations/validate");

//parameters
router.param("businessSessionId", getBusinessSessionIdById);

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
