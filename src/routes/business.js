/* eslint-disable prettier/prettier */
const express = require("express");
const router = express.Router();
const {
  getAllBusinessValidationRules,
  updateBusinessValidationRules,
  createBusinessValidationRules,
} = require("../validations/business");
const {
  getFinanceOfABusiness,
  updateBusinessFinance2,
} = require("../controllers/businessFinance");

const validate = require("../validations/validate");
const { BUSINESS_DEFINITION, CLASS_DEFINITION } = require("../constants/pages");
const { CREATE, UPDATE, READ, DELETE } = require("../constants/rest");

const {
  // getBusinessIdById,
  getBusiness,
  getAllBusinesses,
  createBusiness,
  deleteBusiness,
  updateBusiness,
  //uploadFile,
  uploadXLXSFile,
  // convertXLXSFile,
  businessImageUploadHelper,
  uploadImage,
  getAllBusinessesOfLoginUser,
} = require("../controllers/business");

const { getAllTermsInABusiness } = require("../controllers/term");

const { isAuthorized } = require("../middlewares/auth");
const { getAllBusinessClass } = require("../controllers/businessClass");
const { getAllCategoriesInABusiness } = require("../controllers/category");

const user = require("../controllers/user");
const { getAllDiscountInABusiness } = require("../controllers/discounts");
/**
 * RBAC required for Create, Update, Delete
 * Read is public
 */
//parameters
// router.param("businessId", getBusinessIdById);

//all of actual routes
// eslint-disable-next-line prettier/prettier
//all of actual routes
//create route
router.post(
  "/",
  isAuthorized(BUSINESS_DEFINITION, CREATE),
  createBusinessValidationRules(),
  validate,
  createBusiness
);

router.get(
  "/of-logged-in-user",
  isAuthorized(null, null),
  getAllBusinessesOfLoginUser
);

router.get("/:businessId/terms", getAllTermsInABusiness);
router.get("/:businessId/categories", getAllCategoriesInABusiness);
router.get("/:businessId/discounts", getAllDiscountInABusiness);
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

/**
 * classes
 */
router.get(
  "/:businessId/classes",
  // isAuthorized(CLASS_DEFINITION, "read"),
  getAllBusinessClass
);

/**
 * file upload
 */
//router.post("/fileupload", uploadFile);
//buss
router.post("/xlxsupload", uploadXLXSFile);
//router.get("/convertxlxs/json", convertXLXSFile);

/**
 * finance
 */
router.get("/:businessId/finance", getFinanceOfABusiness);
//buss
router.put(
  "/:businessId/finance",
  isAuthorized(null, null),
  updateBusinessFinance2
);
//buss
router.post(
  "/:businessId/image-upload",
  isAuthorized(null, null),
  businessImageUploadHelper.single("image"),
  uploadImage
);

/**
 * coach
 */
router.get("/:businessId/coaches", user.getAllCoach);

module.exports = router;
