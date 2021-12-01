const { BusinessSession } = require("../../../../models");

const getResourceBusinessIdBySessionId = async (req, res) => {
  let sessionId = req.params.businessSessionId;
  //console.log("sessionId:", sessionId);

  let businessSession = await BusinessSession.findById(sessionId);
  if (!businessSession) return false;
  if (businessSession) {
    //console.log("bussinessId from Session:", businessSession.businessId);
    return businessSession.businessId.toString();
  }
};
module.exports = getResourceBusinessIdBySessionId;
