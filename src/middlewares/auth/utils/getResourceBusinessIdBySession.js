const { BusinessSession } = require("../../../models");

const getResourceBusinessIdBySession = async (req, res) => {
  let sessionId = req.body.sessionId;
  //console.log("sessionId:", sessionId);

  let businessSession = await BusinessSession.findById(sessionId);
  if (!businessSession) return false;
  if (businessSession) {
    //console.log("bussinessId from Session:", businessSession.businessId);
    return businessSession.businessId.toString();
  }
};
module.exports = getResourceBusinessIdBySession;
