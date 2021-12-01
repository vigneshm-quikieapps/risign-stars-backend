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
const { BUSINESS_FINANCE } = require("../constants/pages");
const { CREATE, UPDATE } = require("../constants/rest");
const getResourceBusinessIdInCreate = require("../middlewares/auth/utils/getResourceBusinessId/getResourceBusinessIdInCreate");
const getResourceBusinessIdForFinance = require("../middlewares/auth/utils/getResourceBusinessId/getResourceBusinessIdForFinance");

//parameters
// router.param("businessFinanceId", getBusinessFinanceIdById);

//all of actual routes
//create route

router.post(
  "/",
  isAuthorized(BUSINESS_FINANCE, CREATE, {
    getResourceBusinessId: getResourceBusinessIdInCreate,
  }),
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
  isAuthorized(BUSINESS_FINANCE, UPDATE, {
    getResourceBusinessId: getResourceBusinessIdForFinance,
  }),
  updateBusinessFinanceValidationRules(),
  validate,
  updateBusinessFinance
);

//listing route
router.get("/", getAllBusinessFinance);

router.put(
  "/:businessFinanceId/addDiscounts",
  isAuthorized(BUSINESS_FINANCE, UPDATE, {
    getResourceBusinessId: getResourceBusinessIdForFinance,
  }),
  addDiscountToBusinessFinanceValidationRules(),
  validate,
  addDiscountToBusinessFinance
);

module.exports = router;
