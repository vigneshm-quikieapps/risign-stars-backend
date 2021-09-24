const {Member, Counter, Business} = require("../../models")

async function getClubMembershipId(businessSessionData, session) {
    let membership = await Member.findOne({
        id: req.body.memberId,
        membership: {
          $elemMatch: {businessId: businessSessionData.businessId}
        }
    }).session(session)

    if (!membership) {
    throw new Error();
    }
  
    let businessData = await Business.findById(businessSessionData.businessId)

    return Counter.genClubMemberShipId(businessData, session)
        
}

export default getClubMembershipId