const { Member, Counter, Business } = require("../../../models");
const { Types } = require("mongoose");

const getClubMembershipId = async (req, session) => {
  let { businessSessionData } = req;
  let { businessId } = businessSessionData;
  let { memberId } = req.body;

  let member = await Member.findOne({
    _id: req.body.memberId,
    membership: {
      $elemMatch: { businessId },
    },
  }).session(session);

  if (member) {
    let membership = member.membership.find((item) => {
      return item.businessId.toString() === businessId.toString();
    });

    if (membership) {
      /**
       * if clubmembership exists, return it
       */
      return membership.clubMembershipId;
    }
  }

  let businessData = await Business.findById(businessId);

  let clubMembershipId = await Counter.genClubMemberShipId(
    businessData,
    session
  );

  await Member.updateOne(
    { _id: Types.ObjectId(memberId) },
    { $push: { membership: { businessId, clubMembershipId } } }
  ).session(session);

  return clubMembershipId;
};

module.exports = getClubMembershipId;
