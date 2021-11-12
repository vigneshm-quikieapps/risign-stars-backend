const express = require("express");
const router = express.Router();
const {
  addNewDiscountValidationRules,
  updateStatusOfDiscountValidationRules,
  applyDiscountValidationRules,
} = require("../validations/businessFinance");
const {
  createDiscountValidationRules,
  updateDiscountValidationRules,
  deleteDiscountValidationRules,
} = require("../validations/discount");
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
  applyDiscount,
  updateDiscounts,
} = require("../controllers/discounts");
const { isAuthorized } = require("../middlewares/auth");

// discount routes are listed below

//parameters
// router.param("discountId", getdiscountIdById);

router.post("/apply", applyDiscountValidationRules(), validate, applyDiscount);

//all of actual routes
// eslint-disable-next-line prettier/prettier
//all of actual routes
//create route
router.post(
  "/",
  isAuthorized(null, null),
  createDiscountValidationRules(),
  validate,
  createDiscounts
);

/**
 * get discounts of a business is in business routes
 */
router.put(
  "/:discountId",
  isAuthorized(null, null),
  updateDiscountValidationRules(),
  validate,
  updateDiscounts
);
router.delete(
  "/:discountId",
  isAuthorized(null, null),
  deleteDiscountValidationRules(),
  validate,
  deleteDiscounts
);

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
