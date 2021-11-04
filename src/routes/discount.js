const express = require("express");
const router = express.Router();
const {
  createDiscountValidationRules,
  addNewDiscountValidationRules,
  updateDiscountValidationRules,
  updateStatusOfDiscountValidationRules,
} = require("../validations/businessFinance");
const validate = require("../validations/validate");

const {
  getdiscountIdById,
  createDiscounts,
  getDiscounts,
  deleteDiscounts,
  getAllDiscounts,
  addNewDiscountScheme,
  deleteDiscountScheme,
  updateDiscountsScheme,
  updateStatusOfDiscountsScheme,
} = require("../controllers/discounts");

// discount routes are listed below

//parameters
router.param("discountId", getdiscountIdById);

//all of actual routes
// eslint-disable-next-line prettier/prettier
//all of actual routes
//create route
router.post("/", createDiscountValidationRules(), validate, createDiscounts);

// read routes
router.get("/:businessId", getDiscounts);

//delete route
router.delete("/:discountId", deleteDiscounts);

//update route
// router.put(
//   "/discounts/:discountId",
//   createDiscountValidationRules(),
//   validate,
//   addNewDiscountScheme
// );

//listing route

router.get("/:businessId/", getDiscounts);

router.get("/", getAllDiscounts);

//discountSchemes routes
router.put(
  "/discountsSchemes/:discountId",
  addNewDiscountValidationRules(),
  validate,
  addNewDiscountScheme
);
router.delete("/:discountId", deleteDiscountScheme);

router.put(
  "/discountsSchemes/:discountId/:discountSchemesId",
  updateDiscountValidationRules(),
  validate,
  updateDiscountsScheme
);
router.put(
  "/discountsSchemes/enable-disable/:discountId/:discountSchemesId",
  updateStatusOfDiscountValidationRules(),
  validate,
  updateStatusOfDiscountsScheme
);

module.exports = router;
