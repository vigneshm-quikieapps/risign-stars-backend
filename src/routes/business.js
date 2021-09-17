/* eslint-disable prettier/prettier */
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { getAllBusinessValidationRules } = require("../validations/business");
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
  "/business/create",
  isAuthorized(BUSINESS_DEFINITION, CREATE),
  [
    check("name", "name should be at least 3 char").isLength({ min: 3 }),
    check("code", "code should be atleast 3 char")
      // .optional()
      // .isLength({ min: 3 })
      .isString(),
    check("tradename", "tradename should be at least 3 char").isLength({
      min: 3,
    }),
    check("type", "type should be at least 3 char").isLength({ min: 3 }),
    check("about", "about should be atleast 3 char")
      .optional()
      .isLength({ min: 3 }),
    check("postcode", "postcode should be at least 3 char").isLength({
      min: 3,
    }),
    check("line1", "line1 should be at least 3 char").isLength({ min: 3 }),
    check("city", "city should be at least 3 char").isLength({ min: 3 }),
    check("country", "country should be at least 3 char").isLength({ min: 3 }),
    check("updatedBy", "updatedBy should be a valid userId")
      .optional()
      .isLength({ min: 12 }),
    check("createdBy", "createdBy should be a valid userId").isLength({
      min: 12,
    }),
  ],
  createBusiness
);

// read routes
router.get("/business/:businessId", getBusiness);

//delete route
router.delete(
  "/business/:businessId",
  isAuthorized(BUSINESS_DEFINITION, DELETE),
  deleteBusiness
);

//update route
router.put(
  "/business/:businessId",
  isAuthorized(BUSINESS_DEFINITION, UPDATE),
  [
    check("name", "name should be at least 3 char")
      .optional()
      .isLength({ min: 3 }),
    check("code", "code should be atleast 3 char")
      .optional()
      .isLength({ min: 3 }),
    check("tradename", "tradename should be at least 3 char")
      .optional()
      .isLength({ min: 3 }),
    check("type", "type should be at least 3 char")
      .optional()
      .isLength({ min: 3 }),
    check("about", "about should be atleast 3 char")
      .optional()
      .isLength({ min: 3 }),
    check("postcode", "postcode should be at least 3 char")
      .optional()
      .isLength({ min: 3 }),
    check("line1", "line1 should be at least 3 char")
      .optional()
      .isLength({ min: 3 }),
    check("city", "city should be at least 3 char")
      .optional()
      .isLength({ min: 3 }),
    check("country", "country should be at least 3 char")
      .optional()
      .isLength({ min: 3 }),
    check("updatedBy", "updatedBy should be a valid userId").isLength({
      min: 12,
    }),
    check("createdBy", "createdBy should be a valid userId")
      .optional()
      .isLength({ min: 12 }),
  ],
  updateBusiness
);

//listing route
router.get(
  "/business",
  getAllBusinessValidationRules(),
  validate,
  getAllBusinesses
);

router.post("/business/fileupload", uploadFile);

// WORKING ON THE DUMMY DATA
// router.post("/business/memberdata", storeMemberData);
// router.get("/business/memberdata", getMemberData);

module.exports = router;
