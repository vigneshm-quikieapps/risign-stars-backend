const express = require("express");
const router = express.Router();
//const { check } = require("express-validator");

//const deleteBusinessActivityValidationRules= require("../validations/businessActivityClass")


const {
    getBusinessActivityClassIdById,
    getBusinessActivityClass,
    getAllBusinessActivityClass,
    createBusinessActivityClass,
    updateBusinessActivityClass,
    deleteBusinessActivityClass
} = require("../controllers/businessActivityClass");




//parameters
router.param("businessActivityClassId", getBusinessActivityClassIdById);

//all of actual routes
// eslint-disable-next-line prettier/prettier
//all of actual routes
//create route
router.post(
  "/businessActivityClass/create",
  createBusinessActivityClass
);

// read routes
router.get("/businessActivityClass/:businessActivityClassId", getBusinessActivityClass);

//delete route
router.delete("/businessActivityClass/:businessActivityClassId", deleteBusinessActivityClass);

//update route
router.put(
  "/businessActivityClass/:businessActivityClassId",
  updateBusinessActivityClass
);

//listing route
router.get(
  "/businessActivityClass",
    getAllBusinessActivityClass
);

module.exports = router;
