const express = require("express");
const router = express.Router();

const validate = require("../validations/validate");
const validateArrayResults = require("../validations/validateArrayResults");
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
  getAllTermsInAClassValidationRules,
} = require("../validations/businessClass");
const { getAllBusinessSession } = require("../controllers/businessSession");
const { isAuthorized } = require("../middlewares/auth");
const { getAllTermsInAClass } = require("../controllers/term");
const { CLASS_DEFINITION } = require("../constants/pages");
const getResourceBusinessIdInCreate = require("../middlewares/auth/utils/getResourceBusinessId/getResourceBusinessIdInCreate");
const getResourceBusinessIdInUpdate = require("../middlewares/auth/utils/getResourceBusinessId/getResourceBusinessIdInUpdate");
const { CREATE, DELETE, UPDATE, READ } = require("../constants/rest");

//parameters
// router.param("businessClassId", getBusinessClassIdById);

//all of actual routes

router.get(
  "/of-logged-in-user",
  isAuthorized(null, null),
  getAllClassesForALoggedInBusinessAdmin
);

//create route
router.post(
  "/",
  isAuthorized(CLASS_DEFINITION, CREATE, {
    getResourceBusinessId: getResourceBusinessIdInCreate,
  }),
  createClassValidationRules(),
  validateArrayResults(["charges", "session"]),
  createBusinessClass
);

// read routes
router.get("/:businessClassId", isAuthorized(null, null), getBusinessClass);

//delete route
router.delete(
  "/:businessClassId",
  isAuthorized(CLASS_DEFINITION, DELETE, {
    getResourceBusinessId: getResourceBusinessIdInUpdate,
  }),
  // isBusinessClassRestricted,
  deleteBusinessClass
);

//update route
router.put(
  "/:businessClassId",
  isAuthorized(CLASS_DEFINITION, UPDATE, {
    getResourceBusinessId: getResourceBusinessIdInUpdate,
  }),
  updateClassValidationRules(),
  validate,
  updateBusinessClass
);

router.get("/:classId/members", getAllMembersInAClass);

//listing route
router.get("/:classId/sessions", getAllBusinessSession);

router.get(
  "/:classId/terms",
  getAllTermsInAClassValidationRules(),
  validate,
  getAllTermsInAClass
);

module.exports = router;
