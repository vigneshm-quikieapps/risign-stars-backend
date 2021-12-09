const { query } = require("express-validator");
const { FILTER_TYPES } = require("../constants/constant");
const { check } = require("express-validator");
const { ENUM_STATUS, ENUM_BUSINESS_TYPE } = require("../constants/business");
const { BUSINESS } = require("./constants");

const businessFilter = (filters) => {
  if (!Array.isArray(filters)) {
    return false;
  }

  for (let i = 0; i < filters.length; i++) {
    let filter = JSON.parse(filters[i]);
    let { field, type, value } = filter;
    if (!field || typeof field != "string") {
      return Promise.reject(`filters[${i}].field should be string`);
    }
    if (!type || typeof type != "string" || !FILTER_TYPES.includes(type)) {
      return Promise.reject(
        `filters[${i}].type should be either ${FILTER_TYPES.join("/")}`
      );
    }
    if (!value || typeof value != "string") {
      return Promise.reject(`filters[${i}].value should be string`);
    }
  }
  return true;
};

const getAllBusinessValidationRules = () => {
  return [query("filters").optional().custom(businessFilter)];
};

const createBusinessValidationRules = () => {
  return [
    check("name", "is required").notEmpty(),
    check("code", "is required and should be at most 5 chars ")
    // .optional()
    .isLength({ max: 5 })
    .isString(),
    check("status", BUSINESS.STATUS.MESSAGE).isIn(ENUM_STATUS),
    check("tradename", "is required").notEmpty(),

    check("type", BUSINESS.TYPE.MESSAGE).isIn(ENUM_BUSINESS_TYPE),
    check("contactEmail", "should be a valid email address")
      .optional()
      .isEmail(),
    check("primaryPhone", "should be at least 6 chars")
      .optional()
      .isLength({ min: 6 }),
    check("primaryMobileNo", "should be at least 9 chars")
      .optional()
      .isLength({ min: 9 }),
    check("postcode", "should be at least 6 chars").isLength({
      min: 6,
    }),
    check("line1", "is required").notEmpty(),
    check("city", "is required").notEmpty(),
    check("country", "is required").notEmpty(),
    check("facebook", "should be a valid url").optional().isURL(),
    check("instagram", "should be a valid url").optional().isURL(),
    check("linkedin", "should be a valid url").optional().isURL(),
    check("pinterest", "should be a valid url").optional().isURL(),
  ];
};

/**
 * updating business code is not allowed
 *
 * as business code determines the club membership id
 *
 * @returns
 */
const updateBusinessValidationRules = () => {
  return [
    check("name", "name should be at least 3 char")
      .optional()
      .isLength({ min: 3 }),
    // check("code", "code should be at least 3 char")
    //   .optional()
    //   .isLength({ min: 3 }),
    check("status", BUSINESS.STATUS.MESSAGE).isIn(ENUM_STATUS),
    check("tradename", "tradename should be at least 3 char")
      .optional()
      .isLength({ min: 3 }),
    check("type", BUSINESS.TYPE.MESSAGE).optional().isIn(ENUM_BUSINESS_TYPE),
    check("contactName", "should be at least 3 char")
      .optional()
      .isLength({ min: 3 }),
    check("contactEmail", "should be at least 3 char").optional().isEmail(),
    check("primaryPhone", "should be at least 3 char")
      .optional()
      .isLength({ min: 3 }),
    check("primaryMobileNo", "should be at least 3 char")
      .optional()
      .isLength({ min: 3 }),
    check("about", "should be at least 3 char").optional().isLength({ min: 3 }),
    check("postcode", "should be at least 3 char")
      .optional()
      .isLength({ min: 3 }),
    check("line1", "should be at least 3 char").optional().isLength({ min: 3 }),
    check("city", "should be at least 3 char").optional().isLength({ min: 3 }),
    check("country", "should be at least 3 char")
      .optional()
      .isLength({ min: 3 }),
    check("facebok", "should be a valid url").optional().isURL(),
    check("instagram", "should be a valid url").optional().isURL(),
    check("linkedin", "should be a valid url").optional().isURL(),
    check("pinterest", "should be a valid url").optional().isURL(),
  ];
};
module.exports = {
  getAllBusinessValidationRules,
  updateBusinessValidationRules,
  createBusinessValidationRules,
};
