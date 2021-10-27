const { Category } = require("../models");
const { check } = require("express-validator");
const { isValidBusinessId } = require("./helpers/business");

const checkIsUnique = async (name) => {
  try {
    if (!name) {
      throw new Error();
    }

    let exist = await Category.findOne({ name });

    if (exist) {
      throw new Error();
    }

    return true;
  } catch (err) {
    return Promise.reject(
      `'${name}' already exists!! Please Enter a Unique Name for Category `
    );
  }
};
const createCategoryValidationRules = () => {
  return [
    check("name", "name should be at least 3 char")
      .isLength({ min: 3 })
      .bail()
      .custom(checkIsUnique),
    check("businessId").custom(isValidBusinessId),
  ];
};

const updateCategoryValidationRules = () => {
  return [check("name", "name should be at least 3 char").isLength({ min: 3 })];
};

module.exports = {
  createCategoryValidationRules,
  updateCategoryValidationRules,
  checkIsUnique,
};
