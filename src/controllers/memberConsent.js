const { MemberConsent } = require("../models");

module.exports.get = (req, res) => {
  try {
    let { clubMembershipId } = req.body;
    let consent = MemberConsent.findOne({ clubMembershipId });
    if (!consent) {
      throw new Error("Not found");
    }
    return res.send({ consent });
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};
