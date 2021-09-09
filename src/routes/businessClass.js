const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { TERM_STATUS } = require("../contants/constant");



const {
  getBusinessClassIdById,
  getBusinessClass,
  getAllBusinessClass,
  updateBusinessClass,
  createBusinessClass,
  deleteBusinessClass
} = require("../controllers/businessClass");




//parameters
router.param("businessClassId", getBusinessClassIdById);

//all of actual routes
// eslint-disable-next-line prettier/prettier
//all of actual routes
//create route
router.post(
  "/businessClass/create",[
    check("name", "name should be at least 3 char").isLength({ min: 3 }),
    check("status", "status should  only be [active, inactive]").optional().isIn(TERM_STATUS),
    check("registrationform", "registrationform should only be standard").optional().isIn("standard"),
    check("about", "about should be atleast 3 char").optional().isLength({ min: 3 }),
    check("enrolmentControls", "enrolmentControls should be an Array and should not be empty ").isArray().notEmpty(),
    check("session", "session should be an Array and should not be empty ").isArray().notEmpty(),
    check("charges", "charges should be an Array and should not be empty").isArray().notEmpty(),
  ],
  createBusinessClass
);

// read routes
router.get("/businessClass/:businessClassId", getBusinessClass);

//delete route
router.delete("/businessClass/:businessClassId", deleteBusinessClass);

//update route
router.put(
  "/businessClass/:businessClassId",[
    check("name", "name should be at least 3 char").optional().isLength({ min: 3 }),
    check("status", "status should  only be [active, inactive]").optional().isIn(TERM_STATUS),
    check("registrationform", "registrationform should only be standard").optional().isIn("standard"),
    check("about", "about should be atleast 3 char").optional().isLength({ min: 3 }),
    check("enrolmentControls", "enrolmentControls should be an Array and should not be empty ").optional().isArray().notEmpty(),
    check("session", "session should be an Array and should not be empty ").optional().isArray().notEmpty(),
    check("charges", "charges should be an Array and should not be empty").optional().isArray().notEmpty(),
  ],
  updateBusinessClass
);

//listing route
router.get(
  "/businessClass",
    getAllBusinessClass
);

module.exports = router;
