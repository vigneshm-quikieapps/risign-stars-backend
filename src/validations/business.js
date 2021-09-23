const { query } = require("express-validator");
const { FILTER_TYPES } = require("../contants/constant");
const { check } = require("express-validator");

const businessFilter = (filters) => {
  if (!Array.isArray(filters)) {
    return false;
  }

  for (let i = 0; i < filters.length; i++) {
    let { field, type, value } = filters[i];
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
    check("name", "name should be at least 3 char").isLength({ min: 3 }),
    check("code", "code should be atleast 3 char")
      // .optional()
      // .isLength({ min: 3 })
      .isString(),
    check("tradename", "tradename should be at least 3 char").isLength({
      min: 3,
    }),
    check("type", "type should be at least 3 char").isLength({ min: 3 }),
    check("about", "about should be atleast 3 char")
      .optional()
      .isLength({ min: 3 }),
    check("postcode", "postcode should be at least 3 char").isLength({
      min: 3,
    }),
    check("line1", "line1 should be at least 3 char").isLength({ min: 3 }),
    check("city", "city should be at least 3 char").isLength({ min: 3 }),
    check("country", "country should be at least 3 char").isLength({ min: 3 }),
    check("updatedBy", "updatedBy should be a valid userId")
      .optional()
      .isLength({ min: 12 }),
    check("createdBy", "createdBy should be a valid userId").isLength({
      min: 12,
    }),
    check("facebok", "facebok should be a valid url").isURL(),
    check("instagram", "createdBy should be a valid url").isURL(),
    check("linkedin", "createdBy should be a valid url").isURL(),
    check("pinterest", "createdBy should be a valid url").isURL(),
  ];
};
const updateBusinessValidationRules = () => {
  return [
    check("name", "name should be at least 3 char")
      .optional()
      .isLength({ min: 3 }),
    check("code", "code should be atleast 3 char")
      .optional()
      .isLength({ min: 3 }),
    check("tradename", "tradename should be at least 3 char")
      .optional()
      .isLength({ min: 3 }),
    check("type", "type should be at least 3 char")
      .optional()
      .isLength({ min: 3 }),
    check("about", "about should be atleast 3 char")
      .optional()
      .isLength({ min: 3 }),
    check("postcode", "postcode should be at least 3 char")
      .optional()
      .isLength({ min: 3 }),
    check("line1", "line1 should be at least 3 char")
      .optional()
      .isLength({ min: 3 }),
    check("city", "city should be at least 3 char")
      .optional()
      .isLength({ min: 3 }),
    check("country", "country should be at least 3 char")
      .optional()
      .isLength({ min: 3 }),
    check("updatedBy", "updatedBy should be a valid userId").isLength({
      min: 12,
    }),
    check("createdBy", "createdBy should be a valid userId")
      .optional()
      .isLength({ min: 12 }),
    check("facebok", "facebok should be a valid url").optional().isURL(),
    check("instagram", "instagram should be a valid url").optional().isURL(),
    check("linkedin", "linkedin should be a valid url").optional().isURL(),
    check("pinterest", "pinterest should be a valid url").optional().isURL(),
  ];
};
module.exports = {
  getAllBusinessValidationRules,
  updateBusinessValidationRules,
  createBusinessValidationRules,
};
