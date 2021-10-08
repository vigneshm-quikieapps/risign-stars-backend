const { Types } = require("mongoose");
const { Member } = require("../../../models");

const isValidClubMembershipId = async (clubMembershipId, { req }) => {
  try {
    let member = await Member.findOne({
      _id: Types.ObjectId(req.memberId),
      "membership.clubMembershipId": clubMembershipId,
    });

    if (!member) {
      throw new Error();
    }

    return true;
  } catch (err) {
    return Promise.reject("should be a valid club membership id");
  }
};

module.exports = isValidClubMembershipId;
