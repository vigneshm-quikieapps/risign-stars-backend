const { check } = require("express-validator");
const { isValidBusinessId, isValidDiscountId } = require("./helpers");

//discount validations
const createDiscountValidationRules = () => {
  return [
    check("businessId").custom(isValidBusinessId),
    check("name", "should be a String and at least 3 char long").isLength({
      min: 3,
    }),
    check("value", "should be a Number and an Int").isInt(),
  ];
};

const updateDiscountValidationRules = () => {
  return [
    check("discountId").custom(isValidDiscountId),
    check("name", "should be a String and at least 3 char long").isLength({
      min: 3,
    }),
    check("value", "should be a Number and an Int").isInt(),
  ];
};

const deleteDiscountValidationRules = () => {
  return [check("discountId").custom(isValidDiscountId)];
};

module.exports = {
  createDiscountValidationRules,
  updateDiscountValidationRules,
  deleteDiscountValidationRules,
};
