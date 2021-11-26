const { BusinessClass } = require("../../../models");

const getResourceBusinessIdInUpdate = async (req, res) => {
  let { businessClassId } = req.params;
  console.log(businessClassId);

  let businessClass = await BusinessClass.findById(businessClassId);
  if (!businessClass) return false;
  if (businessClass) {
    console.log(businessClass.businessId);
    return businessClass.businessId.toString();
  }
};
module.exports = getResourceBusinessIdInUpdate;
