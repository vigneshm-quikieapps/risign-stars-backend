const { Category } = require("../../../../models");

const getResourceBusinessIdByCategoryId = async (req, res) => {
  let { categoryId } = req.params;
  //console.log(categoryId);

  let category = await Category.findById(categoryId);
  if (!category) return false;
  if (category) {
    //console.log(category.businessId);
    return category.businessId.toString();
  }
};
module.exports = getResourceBusinessIdByCategoryId;
