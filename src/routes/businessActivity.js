const express = require("express");
const router = express.Router();
//const { check } = require("express-validator");



const {
  getBusinessActivityIdById,
  getBusinessActivity,
  getAllBusinessActivity,
  updateBusinessActivity,
  createBusinessActivity,
  deleteBusinessActivity
} = require("../controllers/businessActivity");




//parameters
router.param("businessActivityId", getBusinessActivityIdById);

//all of actual routes
// eslint-disable-next-line prettier/prettier
//all of actual routes
//create route
router.post(
  "/businessActivity/create",
  createBusinessActivity
);

// read routes
router.get("/businessActivity/:businessActivityId", getBusinessActivity);

//delete route
router.delete("/businessActivity/:businessActivityId", deleteBusinessActivity);

//update route
router.put(
  "/businessActivity/:businessActivityId",
  updateBusinessActivity
);

//listing route
router.get(
  "/businessActivity",
    getAllBusinessActivity
);

module.exports = router;
