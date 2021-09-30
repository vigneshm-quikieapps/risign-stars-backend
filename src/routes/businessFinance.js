/* eslint-disable prettier/prettier */
const express = require("express");
const router = express.Router();
const {
  updateBusinessFinanceValidationRules,
  createBusinessFinanceValidationRules,
  addDiscountValidationRules,
} = require("../validations/businessFinance");
const validate = require("../validations/validate");

const {
  getBusinessFinanceIdById,
  getBusinessFinance,
  getAllBusinessFinance,
  createBusinessFinance,
  deleteBusinessFinance,
  updateBusinessFinance,
  addNewDiscountScheme,
} = require("../controllers/businessFinance");

//parameters
router.param("businessFinanceId", getBusinessFinanceIdById);

//all of actual routes
// eslint-disable-next-line prettier/prettier
//all of actual routes
//create route
router.post(
  "/",
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
  updateBusinessFinanceValidationRules(),
  validate,
  updateBusinessFinance
);

//listing route
router.get("/", getAllBusinessFinance);

router.put(
  "/:businessFinanceId/addDiscounts",
  addDiscountValidationRules(),
  validate,
  addNewDiscountScheme
);

module.exports = router;
