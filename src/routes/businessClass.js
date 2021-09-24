const express = require("express");
const router = express.Router();

const validate = require("../validations/validate");

const {
  getBusinessClassIdById,
  getBusinessClass,
  updateBusinessClass,
  createBusinessClass,
  deleteBusinessClass,
  isBusinessClassRestricted,
} = require("../controllers/businessClass");
const {
  createClassValidationRules,
  updateClassValidationRules,
} = require("../validations/businessClass");

//parameters
router.param("businessClassId", getBusinessClassIdById);

//all of actual routes
// eslint-disable-next-line prettier/prettier
//all of actual routes
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

//listing route

module.exports = router;
