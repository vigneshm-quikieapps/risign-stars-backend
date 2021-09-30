const { newEnrolmentHandler } = require("./helpers");

const trialEnrolment = async (req, res) => {
  req.body.isTrialEnrolment = true;
  return newEnrolmentHandler(req, res);
};

module.exports = trialEnrolment;
