const Category = require("../models/Category");

module.exports.checkIsUnique = async (name) => {
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
