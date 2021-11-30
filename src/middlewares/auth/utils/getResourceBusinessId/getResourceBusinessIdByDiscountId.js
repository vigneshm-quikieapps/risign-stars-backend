const { Discounts } = require("../../../../models");

const getResourceBusinessIdByDiscountId = async (req, res) => {
  let { discountId } = req.params;
  //console.log(discountId);

  let discount = await Discounts.findById(discountId);
  if (!discount) return false;
  if (discount) {
    //console.log(discount.businessId);
    return discount.businessId.toString();
  }
};
module.exports = getResourceBusinessIdByDiscountId;
