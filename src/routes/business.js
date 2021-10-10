/* eslint-disable prettier/prettier */
const express = require("express");
const router = express.Router();
const {
  getAllBusinessValidationRules,
  updateBusinessValidationRules,
  createBusinessValidationRules,
} = require("../validations/business");
const validate = require("../validations/validate");
const { BUSINESS_DEFINITION } = require("../constants/pages");
const { CREATE, UPDATE, DELETE } = require("../constants/rest");

const {
  getBusinessIdById,
  getBusiness,
  getAllBusinesses,
  createBusiness,
  deleteBusiness,
  updateBusiness,
  uploadFile,
  businessImageUploadHelper,
  uploadImage,
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

router.post(
  "/:businessId/image-upload",
  businessImageUploadHelper.single("image"),
  uploadImage
);

// WORKING ON THE DUMMY DATA
// router.post("/business/memberdata", storeMemberData);
// router.get("/business/memberdata", getMemberData);

module.exports = router;
