/* eslint-disable prettier/prettier */
const express = require("express");
const router = express.Router();
const {
  getAllBusinessValidationRules,
  updateBusinessValidationRules,
  createBusinessValidationRules,
} = require("../validations/business");
const validate = require("../validations/validate");
const { BUSINESS_DEFINITION } = require("../contants/pages");
const { CREATE, UPDATE, DELETE } = require("../contants/rest");

const {
  getBusinessIdById,
  getBusiness,
  getAllBusinesses,
  createBusiness,
  deleteBusiness,
  updateBusiness,
  uploadFile,
} = require("../controllers/business");
const { isAuthorized } = require("../middlewares/auth");
const { getAllBusinessClass } = require("../controllers/businessClass");

/**
 * RBAC required for Create, Update, Delete
 * Read is public
 */

//parameters
router.param("businessId", getBusinessIdById);

//all of actual routes
// eslint-disable-next-line prettier/prettier
//all of actual routes
//create route
router.post(
  "/",
  isAuthorized(BUSINESS_DEFINITION, CREATE),
  createBusinessValidationRules,
  validate,
  createBusiness
);

// read routes
router.get("/:businessId", getBusiness);

//delete route
router.delete(
  "/:businessId",
  isAuthorized(BUSINESS_DEFINITION, DELETE),
  deleteBusiness
);

//update route
router.put(
  "/:businessId",
  isAuthorized(BUSINESS_DEFINITION, UPDATE),
  updateBusinessValidationRules(),
  validate,
  updateBusiness
);

//listing route
router.get("/", getAllBusinessValidationRules(), validate, getAllBusinesses);
router.get("/:businessId/classes", getAllBusinessClass);

router.post("/fileupload", uploadFile);

// WORKING ON THE DUMMY DATA
// router.post("/business/memberdata", storeMemberData);
// router.get("/business/memberdata", getMemberData);

module.exports = router;
