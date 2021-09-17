/* eslint-disable prettier/prettier */
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { getAllBusinessValidationRules } = require("../validations/business");
const validate = require("../validations/validate");

const {
  getBusinessIdById,
  getBusiness,
  getAllBusinesses,
  createBusiness,
  deleteBusiness,
  updateBusiness,
  uploadFile,
} = require("../controllers/business");




//parameters
router.param("businessId", getBusinessIdById);

//all of actual routes
// eslint-disable-next-line prettier/prettier
//all of actual routes
//create route 
router.post(
  "/business/create",
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
    check("updatedBy", "updatedBy should be a valid userId").optional().isLength({ min: 12 }),
    check("createdBy", "createdBy should be a valid userId").isLength({ min: 12 }),
    check("facebok", "facebok should be a valid url").isURL(),
    check("instagram", "createdBy should be a valid url").isURL(),
    check("linkedin", "createdBy should be a valid url").isURL(),
    check("pinterest", "createdBy should be a valid url").isURL(),
  ],
  createBusiness
);

// read routes
router.get("/business/:businessId", getBusiness);

//delete route
router.delete("/business/:businessId", deleteBusiness);

//update route
router.put(
  "/business/:businessId",
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
    check("updatedBy", "updatedBy should be a valid userId").isLength({ min: 12 }),
    check("createdBy", "createdBy should be a valid userId").optional().isLength({ min: 12 }),
    check("facebok", "facebok should be a valid url").optional().isURL(),
    check("instagram", "instagram should be a valid url").optional().isURL(),
    check("linkedin", "linkedin should be a valid url").optional().isURL(),
    check("pinterest", "pinterest should be a valid url").optional().isURL(),
    

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
