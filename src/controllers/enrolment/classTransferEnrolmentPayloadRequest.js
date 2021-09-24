const classTransferEnrolmentPayloadRequest = (data) => {
  return {
    sessionId: data.newSessionId,
    classId: data.classId,
    businessId: data.businessId,
    name: data.name,
    memberId: data.memberId,
    clubMembershipId: data.clubMembershipId,
    consent: data.consent,
    newsletter: data.newsletter,
    startDate: data.startDate,
    registeredDate: data.registeredDate,
  };
};

module.exports = classTransferEnrolmentPayloadRequest;
