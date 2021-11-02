const { Discounts } = require("../../../models");

const isValidDiscountId = async (discountId, { req }) => {
  try {
    let discount = await Discounts.findById(discountId);

    if (!discount) {
      throw new Error("Does not exists");
    }

    req.discountData = discount;

    return true;
  } catch (err) {
    return Promise.reject("should be a valid discount Id");
  }
};

module.exports = isValidDiscountId;
