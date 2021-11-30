const { BusinessFinance } = require("../../../../models");

const getResourceBusinessIdForFinance = async (req, res) => {
  let businessFinanceId = req.params.businessFinanceId;
  //console.log("sessionId:", sessionId);

  let businessFinance = await BusinessFinance.findById(businessFinanceId);
  if (!businessFinance) return false;
  if (businessFinance) {
    //console.log("bussinessId from businessFinance:", businessFinance.businessId);
    return businessFinance.businessId.toString();
  }
};
module.exports = getResourceBusinessIdForFinance;
