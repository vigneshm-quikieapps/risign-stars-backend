const { businessIdValidation } = require("./businessClass");
const { check } = require("express-validator");

const createTermValidationRules = () => {
  return [
    check("businessId").custom(businessIdValidation),
    // check("code", "code should be a Numbre/Integer  ").isInt(),
    check("label", "label should be atleast 3 chatecters").isLength({
      min: 3,
    }),
    check("startdate", "starttime   should be a date").isDate({
      format: "MM-DD-YYYY",
    }),
    check("startdate", "endtime   should be a date").isDate({
      format: "MM-DD-YYYY",
    }),
    // check(
    //   "classsequence",
    //   "classsequence should be a Number/Integer  "
    // ).isInt(),
  ];
};
const updateTermValidationRules = () => {
  return [
    check("business").optional().custom(businessIdValidation),
    // check("code", "code should be a Numbre/Integer  ").optional().isInt(),
    check("label", "label should be atleast 3 chatecters")
      .optional()
      .isLength({ min: 3 }),
    check(
      "startdate",
      "starttime   should be a date in format: 'MM-DD-YYYY'"
    ).optional(),
    check(
      "startdate",
      "endtime   should be a date in format: 'MM-DD-YYYY'"
    ).optional(),
    // check("classsequence", "classsequence should be a Numbre/Integer  ")
    //   .optional()
    //   .isInt(),
  ];
};
module.exports = {
  createTermValidationRules,
  updateTermValidationRules,
};
