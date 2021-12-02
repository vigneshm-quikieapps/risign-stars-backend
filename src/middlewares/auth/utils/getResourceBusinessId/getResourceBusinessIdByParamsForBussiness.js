const getResourceBusinessIdByParamsForBussiness = (req, res) => {
  let { businessId } = req.params;
  //console.log(businessId);
  if (businessId) return businessId;

  return false;
};
module.exports = getResourceBusinessIdByParamsForBussiness;
