/* eslint-disable prettier/prettier */
const express = require("express");
const router = express.Router();
const {
  updateBusinessFinanceValidationRules,
  addDiscountToBusinessFinanceValidationRules,
  createBusinessFinanceValidationRules,
} = require("../validations/businessFinance");
const validate = require("../validations/validate");

const {
  // getBusinessFinanceIdById,
  getBusinessFinance,
  getAllBusinessFinance,
  createBusinessFinance,
  deleteBusinessFinance,
  updateBusinessFinance,
  addDiscountToBusinessFinance,
} = require("../controllers/businessFinance");
const { isAuthorized } = require("../middlewares/auth");

//parameters
// router.param("businessFinanceId", getBusinessFinanceIdById);

//all of actual routes
//create route
router.post(
  "/",
  isAuthorized(null, null),
  createBusinessFinanceValidationRules(),
  validate,
  createBusinessFinance
);

// read routes
router.get("/:businessFinanceId", getBusinessFinance);

//delete route
router.delete("/:businessFinanceId", deleteBusinessFinance);

//update route
router.put(
  "/:businessFinanceId",
  isAuthorized(null, null),
  updateBusinessFinanceValidationRules(),
  validate,
  updateBusinessFinance
);

//listing route
router.get("/", getAllBusinessFinance);

router.put(
  "/:businessFinanceId/addDiscounts",
  addDiscountToBusinessFinanceValidationRules(),
  validate,
  addDiscountToBusinessFinance
);

module.exports = router;
