const express = require("express");
const router = express.Router();
//const { check } = require("express-validator");

//const deleteBusinessActivityValidationRules= require("../validations/businessActivityClass")


const {
    getBusinessSessionIdById,
    getBusinessSession,
    getAllBusinessSession,
    createBusinessSession,
    updateBusinessSession,
    deleteBusinessSession
} = require("../controllers/businessSession");




//parameters
router.param("businessSessionId", getBusinessSessionIdById);

//all of actual routes
// eslint-disable-next-line prettier/prettier
//all of actual routes
//create route
router.post(
  "/businessSession/create",
  createBusinessSession
);

// read routes
router.get("/businessSession/:businessSessionId", getBusinessSession);

//delete route
router.delete("/businessSession/:businessSessionId", deleteBusinessSession);

//update route
router.put(
  "/businessSession/:businessSessionId",
  updateBusinessSession
);
//listing route
router.get(
  "/businessSession",
    getAllBusinessSession
);

module.exports = router;
