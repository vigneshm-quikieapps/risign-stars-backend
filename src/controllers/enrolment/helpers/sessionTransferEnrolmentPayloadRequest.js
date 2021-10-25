const sessionTransferEnrolmentPayloadRequest = (req) => {
  let { newSessionData, enrolmentData } = req;
  let { id, classId, businessId } = newSessionData;
  let { clubMembershipId, consent, newsletter, memberId } = enrolmentData;

  return {
    sessionId: id,
    classId,
    businessId,
    memberId,
    clubMembershipId,
    consent,
    newsletter,
    startDate: new Date(),
    registeredDate: new Date(),
  };
};

module.exports = sessionTransferEnrolmentPayloadRequest;
