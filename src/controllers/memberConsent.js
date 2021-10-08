const { MemberConsent } = require("../models");

module.exports.get = (req, res) => {
  try {
    let { clubMembershipId } = req.body;
    let consent = MemberConsent.findOne({ clubMembershipId });
    return res.send({ consent });
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};

module.exports.create = async (req, res) => {
  try {
    let { businessId, memberId, clubMembershipId } = req.body;
    let filter = { businessId, memberId, clubMembershipId };
    let consent = await MemberConsent.updateOne(filter, { ...req.body });

    return res.send({ message: "consent recorded successfully", consent });
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};
