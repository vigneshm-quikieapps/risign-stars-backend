const { BusinessSession } = require("../../models");

module.exports.generate = () => {};

module.exports.generateTrialBill = (req) => {
  let { sessionId } = req.body;
  let trialCharge = BusinessSession.findById(sessionId, {});
  return trialCharge;
};
