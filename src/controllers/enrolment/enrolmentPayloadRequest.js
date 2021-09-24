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
  let { classId, businessId, id } = req.sessionData;
  let { clubMembershipId } = req;

  return {
    sessionId: id,
    classId,
    businessId,
    memberId: data.memberId,
    clubMembershipId,
    consent: data.consent,
    newsletter: data.newsletter,
    startDate: new Date(),
    registeredDate: new Date(),
  };
};

module.exports = enrolmentPayloadRequest;
