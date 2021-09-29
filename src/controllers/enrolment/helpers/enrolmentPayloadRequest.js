/**
 * TODO
 * startDate
 *
 *
 * @param {*} req
 * @returns
 */
const enrolmentPayloadRequest = (req) => {
  let data = req.body;
  let { classId, businessId, id } = req.businessSessionData;
  let { clubMembershipId } = req;

  return {
    sessionId: id,
    classId,
    businessId,
    memberId: data.memberId,
    clubMembershipId,
    startDate: new Date(),
    registeredDate: new Date(),
  };
};

module.exports = enrolmentPayloadRequest;
