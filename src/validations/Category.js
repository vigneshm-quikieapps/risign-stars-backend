const Category = require("../models/Category");
const { check } = require("express-validator");

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
      .custom(checkIsUnique),
    check("updatedBy", "updatedBy should be a valid userId")
      .optional()
      .isLength({ min: 12 }),
    check("createdBy", "createdBy should be a valid userId").isLength({
      min: 12,
    }),
  ];
};
const updateCategoryValidationRules = () => {
  return [
    check("name", "name should be at least 3 char").isLength({ min: 3 }),
    check("updatedBy", "updatedBy should be a valid userId").isLength({
      min: 12,
    }),
  ];
};
module.exports = {
  createCategoryValidationRules,
  updateCategoryValidationRules,
  checkIsUnique,
};
