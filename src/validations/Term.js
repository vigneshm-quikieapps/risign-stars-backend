const { check } = require("express-validator");
const { isValidBusinessId } = require("./helpers/business");

const createTermValidationRules = () => {
  return [
    check("businessId").custom(isValidBusinessId),
    // check("code", "code should be a Numbre/Integer  ").isInt(),
    check("label", "label should be at least 3 chatecters").isLength({
      min: 3,
    }),
    check("startDate", "should be in the following format: YYYY-MM-DD").isDate({
      format: "YYYY-MM-DD",
      strictMode: true,
    }),
    check("startDate", "should be in the following format: YYYY-MM-DD").isDate({
      format: "YYYY-MM-DD",
      strictMode: true,
    }),
    check("termFee", "Term fee should be a positive Number").isInt({ min: 0 }),
    // check(
    //   "classsequence",
    //   "classsequence should be a Number/Integer  "
    // ).isInt(),
  ];
};

const updateTermValidationRules = () => {
  return [
    // check("code", "code should be a Numbre/Integer  ").optional().isInt(),
    check("label", "label should be at least 3 chatecters")
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
    check("termFee", "Term fee should be a positive Number")
      .optional()
      .isInt({ min: 0 }),
    // check("classsequence", "classsequence should be a Numbre/Integer  ")
    //   .optional()
    //   .isInt(),
  ];
};

module.exports = {
  createTermValidationRules,
  updateTermValidationRules,
};
