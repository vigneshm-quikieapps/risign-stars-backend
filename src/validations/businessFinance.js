//const BusinessFinance = require("../models/businessFinance");
const { check } = require("express-validator");
const Business = require("../models/business");

const businessIdValidation = async (businessId) => {
  try {
    if (!businessId) {
      throw new Error();
    }

    let business = await Business.findById(businessId);
    if (!business) {
      throw new Error();
    }

    return true;
  } catch (err) {
    return Promise.reject(`Please select a valid Business`);
  }
};

const createBusinessFinanceValidationRules = () => {
  return [
    check("businessId", "businessId should be a valid businessId")
      .isLength({ min: 3 })
      .custom(businessIdValidation),
    check("bankDetails", "bankDetails should be a object").isObject(),
    check(
      "bankDetails.accHolderName",
      "accHolderName should be a String and atleast 3 char long"
    ).isLength({ min: 3 }),
    check(
      "bankDetails.bankName",
      "bankName should be a String and atleast 3 char long"
    ).isLength({ min: 3 }),
    check(
      "bankDetails.sortCode",
      "sortCode should be a String and atleast 3 char long"
    ).isLength({ min: 3 }),
    check("bankDetails.accNo", "accNo should be a Number")
      .isInt()
      .isLength({ min: 1 }),
    check("paymentMethod", "paymentMethod should be a Object").isObject(),
    check("paymentMethod.online", "online should be a true/false").isBoolean(),
    check("paymentMethod.manual", "manual should be a true/false").isBoolean(),
    check("discountSchemes", "discountSchemes should be a Array").isArray(),
    check(
      "discountSchemes.*.name",
      "name should be a String and atleast 3 char long"
    ).isLength({ min: 3 }),
    check(
      "discountSchemes.*.type",
      "type should be a String and atleast 3 char long ,SHOULD BE PERCENTAGE"
    ).isIn(["PERCENTAGE"]),
    check(
      "discountSchemes.*.value",
      "value should be a Number and an Int"
    ).isInt(),
    check("updatedBy", "updatedBy should be a valid userId")
      .optional()
      .isLength({ min: 12 }),
    check("createdBy", "createdBy should be a valid userId").isLength({
      min: 12,
    }),
  ];
};
const updateBusinessFinanceValidationRules = () => {
  return [
    check("businessId", "businessId should be a valid businessId")
      .isLength({ min: 3 })
      .optional()
      .custom(businessIdValidation),
    check("bankDetails", "bankDetails should be a object")
      .optional()
      .isObject(),
    check(
      "bankDetails.accHolderName",
      "accHolderName should be a String and atleast 3 char long"
    )
      .optional()
      .isLength({ min: 3 }),
    check(
      "bankDetails.bankName",
      "bankName should be a String and atleast 3 char long"
    )
      .optional()
      .isLength({ min: 3 }),
    check(
      "bankDetails.sortCode",
      "sortCode should be a String and atleast 3 char long"
    )
      .optional()
      .isLength({ min: 3 }),
    check("bankDetails.accNo", "accNo should be a Number")
      .optional()
      .isInt()
      .isLength({ min: 1 }),
    check("paymentMethod", "paymentMethod should be a Object")
      .optional()
      .isObject(),
    check("paymentMethod.online", "online should be a true/false")
      .optional()
      .isBoolean(),
    check("paymentMethod.manual", "manual should be a true/false")
      .optional()
      .isBoolean(),
    check("discountSchemes", "discountSchemes should be a Array")
      .optional()
      .isArray(),
    check(
      "discountSchemes.*.name",
      "name should be a String and atleast 3 char long"
    )
      .optional()
      .isLength({ min: 3 }),
    check(
      "discountSchemes.*.type",
      "type should be a String and atleast 3 char long ,SHOULD BE PERCENTAGE"
    )
      .optional()
      .isIn(["PERCENTAGE"]),
    check("discountSchemes.*.value", "value should be a Number and an Int")
      .optional()
      .isInt(),
    check("updatedBy", "updatedBy should be a valid userId").isLength({
      min: 12,
    }),
  ];
};
const addDiscountValidationRules = () => {
  return [
    check("discountSchemes", "discountSchemes should be a Array").isArray(),
    check(
      "discountSchemes.*.name",
      "name should be a String and atleast 3 char long"
    ).isLength({ min: 3 }),
    check(
      "discountSchemes.*.type",
      "type should be a String and atleast 3 char long ,SHOULD BE PERCENTAGE"
    ).isIn(["PERCENTAGE"]),
    check(
      "discountSchemes.*.value",
      "value should be a Number and an Int"
    ).isInt(),
  ];
};
module.exports = {
  createBusinessFinanceValidationRules,
  updateBusinessFinanceValidationRules,
  addDiscountValidationRules,
};
