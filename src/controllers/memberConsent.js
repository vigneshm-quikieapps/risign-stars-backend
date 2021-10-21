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

/**
 * get member consent by club membership id
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
module.exports.getByClubMembershipId = async (req, res) => {
  try {
    let { clubMembershipId } = req.params;
    let memberConsent = await MemberConsent.find({ clubMembershipId });
    if (!memberConsent) {
      throw new Error("Not found");
    }
    return res.send({ memberConsent });
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};
