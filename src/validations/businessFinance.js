const { check } = require("express-validator");
const { Business, User, Discounts, BusinessFinance } = require("../models");
const { Types } = require("mongoose");
const { ENUM_BUSINESS_FINANCE } = require("../constants/businessFinance");

const discountIdValidation = async (discountSchemesId) => {
  try {
    if (!discountSchemesId) {
      throw new Error();
    }

    let discountSchemes = await Discounts.findById(discountSchemesId);
    if (!discountSchemes) {
      throw new Error();
    }

    return true;
  } catch (err) {
    return Promise.reject(`Please select a valid discountSchemesId`);
  }
};
const businessIdValidation = async (businessId) => {
  try {
    if (!businessId) {
      throw new Error();
    }

    /** business id should be valid */
    let business = await Business.findById(businessId);
    if (!business) {
      throw new Error("should be a valid business");
    }

    /** finance record should not exists for this particular business */
    let businessFinanceCount = await BusinessFinance.count({
      businessId: Types.ObjectId(businessId),
    });
    if (businessFinanceCount) {
      throw new Error("Finance record for this business already exists");
    }

    return true;
  } catch (err) {
    return Promise.reject(err.message);
  }
};

const userIdValidation = async (userId) => {
  try {
    if (!userId) {
      throw new Error();
    }

    let user = await User.findById(userId);
    if (!user) {
      throw new Error();
    }

    return true;
  } catch (err) {
    return Promise.reject(`Please select a valid User`);
  }
};

const isValidCharges = (charges) => {
  try {
    if (charges.length > 1) {
      throw new Error("charges should contain only one charge object");
    }

    if (!("amount" in charges[0])) {
      throw new Error("object with key amount is required");
    }

    return true;
  } catch (err) {
    return Promise.reject(err.message);
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
      "accHolderName should be a String and at least 3 char long"
    ).isLength({ min: 3 }),
    check(
      "bankDetails.bankName",
      "bankName should be a String and at least 3 char long"
    ).isLength({ min: 3 }),
    check(
      "bankDetails.sortCode",
      "sortCode should be a String and at least 3 char long"
    ).isLength({ min: 3 }),
    check("bankDetails.accNo", "accNo should be a Number")
      .isInt()
      .isLength({ min: 1 }),
    check("charges", "is required").bail().custom(isValidCharges),
    check("paymentChannels", "should be a Object").isObject(),
    check("paymentChannels.online", "should be a true/false").isBoolean(),
    check("paymentChannels.manual", "should be a true/false").isBoolean(),
    check("discountSchemesId", "discountSchemesId should be a valid businessId")
      .optional()
      .custom(discountIdValidation),
    check(
      "paymentMethods.*",
      `should be either: ${ENUM_BUSINESS_FINANCE.join(" / ")}`
    ).isIn(ENUM_BUSINESS_FINANCE),
    // check("updatedBy", "updatedBy should be a valid userId")
    //   .optional()
    //   .isLength({ min: 12 })
    //   .custom(userIdValidation),
    // check("createdBy", "createdBy should be a valid userId")
    //   .isLength({ min: 12 })
    //   .custom(userIdValidation),
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
      "accHolderName should be a String and at least 3 char long"
    )
      .optional()
      .isLength({ min: 3 }),
    check(
      "bankDetails.bankName",
      "bankName should be a String and at least 3 char long"
    )
      .optional()
      .isLength({ min: 3 }),
    check(
      "bankDetails.sortCode",
      "sortCode should be a String and at least 3 char long"
    )
      .optional()
      .isLength({ min: 3 }),
    check("bankDetails.accNo", "accNo should be a Number")
      .optional()
      .isInt()
      .isLength({ min: 1 }),
    check("paymentChannels", "should be a Object").optional().isObject(),
    check("paymentChannels.online", "should be a true/false")
      .optional()
      .isBoolean(),
    check("paymentChannels.manual", "should be a true/false")
      .optional()
      .isBoolean(),
    check("discountSchemesId", "discountSchemesId should be a valid businessId")
      .optional()
      .custom(discountIdValidation),
    check(
      "paymentMethods.*",
      `should be either: ${ENUM_BUSINESS_FINANCE.join(" / ")}`
    )
      .optional()
      .isIn(ENUM_BUSINESS_FINANCE),
  ];
};

const addDiscountToBusinessFinanceValidationRules = () => {
  return [
    check(
      "discountSchemesId",
      "discountSchemesId should be a valid businessId"
    ).custom(discountIdValidation),
  ];
};
const updateStatusOfDiscountValidationRules = () => {
  return [
    check("status", "status should be a ACTIVE/INACTIVE").isIn([
      "ACTIVE",
      "INACTIVE",
    ]),
  ];
};

//discount validations
const createDiscountValidationRules = () => {
  return [
    check("businessId", "businessId should be a valid businessId")
      .isLength({ min: 3 })
      .custom(businessIdValidation),
    check("discountSchemes", "discountSchemes should be a Array").isArray(),
    check(
      "discountSchemes.*.name",
      "name should be a String and at least 3 char long"
    ).isLength({ min: 3 }),
    check(
      "discountSchemes.*.type",
      "type should be a String and at least 3 char long ,SHOULD BE PERCENTAGE"
    ).isIn(["PERCENTAGE"]),
    check(
      "discountSchemes.*.value",
      "value should be a Number and an Int"
    ).isInt(),
    check("discountSchemes.*.status", "status should be ACTIVE/INACTIVE ")
      .optional()
      .isIn(["ACTIVE", "INACTIVE"]),
  ];
};
const addNewDiscountValidationRules = () => {
  return [
    check("discountSchemes", "discountSchemes should be a Array").isArray(),
    check(
      "discountSchemes.*.name",
      "name should be a String and at least 3 char long"
    ).isLength({ min: 3 }),
    check(
      "discountSchemes.*.type",
      "type should be a String and at least 3 char long ,SHOULD BE PERCENTAGE"
    ).isIn(["PERCENTAGE"]),
    check(
      "discountSchemes.*.value",
      "value should be a Number and an Int"
    ).isInt(),
    check("discountSchemes.*.status", "status should be ACTIVE/INACTIVE ")
      .optional()
      .isIn(["ACTIVE", "INACTIVE"]),
  ];
};
const updateDiscountValidationRules = () => {
  return [
    check("name", "name should be a String and at least 3 char long").isLength({
      min: 3,
    }),
    check(
      "type",
      "type should be a String and at least 3 char long ,SHOULD BE PERCENTAGE"
    ).isIn(["PERCENTAGE"]),
    check("value", "value should be a Number and an Int").isInt(),
    check("status", "status should be ACTIVE/INACTIVE ")
      .optional()
      .isIn(["ACTIVE", "INACTIVE"]),
  ];
};
module.exports = {
  createBusinessFinanceValidationRules,
  updateBusinessFinanceValidationRules,
  createDiscountValidationRules,
  userIdValidation,
  addDiscountToBusinessFinanceValidationRules,
  discountIdValidation,
  addNewDiscountValidationRules,
  updateDiscountValidationRules,
  updateStatusOfDiscountValidationRules,
};
