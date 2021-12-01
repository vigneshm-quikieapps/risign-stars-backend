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
const { DISCOUNT } = require("../constants/pages");
const { CREATE, DELETE, UPDATE } = require("../constants/rest");
const getResourceBusinessIdInCreate = require("../middlewares/auth/utils/getResourceBusinessId/getResourceBusinessIdInCreate");
const getResourceBusinessIdByDiscountId = require("../middlewares/auth/utils/getResourceBusinessId/getResourceBusinessIdByDiscountId");
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
  isAuthorized(DISCOUNT, CREATE, {
    getResourceBusinessId: getResourceBusinessIdInCreate,
  }),
  createDiscountValidationRules(),
  validate,
  createDiscounts
);

/**
 * get discounts of a business is in business routes
 */
router.put(
  "/:discountId",
  isAuthorized(DISCOUNT, UPDATE, {
    getResourceBusinessId: getResourceBusinessIdByDiscountId,
  }),
  updateDiscountValidationRules(),
  validate,
  updateDiscounts
);
router.delete(
  "/:discountId",
  isAuthorized(DISCOUNT, DELETE, {
    getResourceBusinessId: getResourceBusinessIdByDiscountId,
  }),
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
  isAuthorized(DISCOUNT, UPDATE, {
    getResourceBusinessId: getResourceBusinessIdByDiscountId,
  }),
  addNewDiscountValidationRules(),
  validate,
  addNewDiscountScheme
);
router.delete(
  "/:discountId",
  isAuthorized(DISCOUNT, DELETE, {
    getResourceBusinessId: getResourceBusinessIdByDiscountId,
  }),
  deleteDiscountScheme
);

router.put(
  "/discountsSchemes/:discountId/:discountSchemesId",
  isAuthorized(DISCOUNT, UPDATE, {
    getResourceBusinessId: getResourceBusinessIdByDiscountId,
  }),
  updateDiscountValidationRules(),
  validate,
  updateDiscountsScheme
);
router.put(
  "/discountsSchemes/enable-disable/:discountId/:discountSchemesId",
  isAuthorized(DISCOUNT, UPDATE, {
    getResourceBusinessId: getResourceBusinessIdByDiscountId,
  }),
  updateStatusOfDiscountValidationRules(),
  validate,
  updateStatusOfDiscountsScheme
);

module.exports = router;
