const enrolmentPayloadRequest = (data) => {
  return {
    // id: data.id,
    sessionId: data.sessionId,
    classId: data.classId,
    businessId: data.businessId,
    name: data.name,
    memberId: data.memberId,
    clubMembershipId: data.clubMembershipId,
    consent: data.consent,
    newsletter: data.newsletter,
    startDate: data.startDate,
    registeredDate: data.registeredDate,

    // enrolledStatus: {
    //   type: String,
    //   enum: ENUM_ENROLLED_STATUS
    // },
    // discontinuationReason: {
    //   type: String,
    //   enum: ENUM_DISCONTINUATION_REASON
    // },
    // droppedDate: Date,
  };
};

module.exports = enrolmentPayloadRequest;
