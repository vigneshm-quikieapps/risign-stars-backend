const express = require("express");
const router = express.Router();

const validate = require("../validations/validate");

const {
  // getBusinessClassIdById,
  getBusinessClass,
  updateBusinessClass,
  createBusinessClass,
  deleteBusinessClass,
  isBusinessClassRestricted,
  getAllMembersInAClass,
  getAllClassesForALoggedInBusinessAdmin,
} = require("../controllers/businessClass");
const {
  createClassValidationRules,
  updateClassValidationRules,
} = require("../validations/businessClass");
const { getAllBusinessSession } = require("../controllers/businessSession");
const { isAuthorized } = require("../middlewares/auth");

//parameters
// router.param("businessClassId", getBusinessClassIdById);

//all of actual routes

const isAuthHandler = (req, res) => {
  /**
   * TODO: add the logic.
   */
  return true;
};

router.get(
  "/of-logged-in-user",
  isAuthorized(null, null, { isAuthHandler }),
  getAllClassesForALoggedInBusinessAdmin
);

//create route
router.post("/", createClassValidationRules(), validate, createBusinessClass);

// read routes
router.get("/:businessClassId", getBusinessClass);

//delete route
router.delete(
  "/:businessClassId",
  isBusinessClassRestricted,
  deleteBusinessClass
);

//update route
router.put(
  "/:businessClassId",
  updateClassValidationRules(),
  validate,
  updateBusinessClass
);

router.get("/:classId/members", getAllMembersInAClass);

//listing route
router.get("/:classId/sessions", getAllBusinessSession);

module.exports = router;
