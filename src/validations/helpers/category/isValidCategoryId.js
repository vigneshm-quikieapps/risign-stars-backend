const { Category } = require("../../../models");

const isValidCategoryId = async (categoryId, { req }) => {
  try {
    if (!categoryId) {
      throw new Error();
    }

    let category = await Category.findById(categoryId);
    if (!category) {
      throw new Error();
    }

    req.categoryData = category;

    return true;
  } catch (err) {
    return Promise.reject(`Please select a valid category`);
  }
};

module.exports = isValidCategoryId;
