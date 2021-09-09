const express = require("express");
const router = express.Router();
//const { check } = require("express-validator");



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
  "/businessClass/create",
  createBusinessClass
);

// read routes
router.get("/businessClass/:businessClassId", getBusinessClass);

//delete route
router.delete("/businessClass/:businessClassId", deleteBusinessClass);

//update route
router.put(
  "/businessClass/:businessClassId",
  updateBusinessClass
);

//listing route
router.get(
  "/businessClass",
    getAllBusinessClass
);

module.exports = router;
