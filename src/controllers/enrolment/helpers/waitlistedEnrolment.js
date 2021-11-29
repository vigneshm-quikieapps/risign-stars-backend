const {
  BusinessSession,
  Enrolment,
  MemberConsent,
} = require("../../../models");
const enrolmentPayloadRequest = require("./enrolmentPayloadRequest");

const waitlistedEnrolment = async (req, session) => {
  let { sessionId, memberId, consent, newsletter } = req.body;
  let { businessId } = req.businessSessionData;

  // creating enrolment till session capacity
  const createEnrolmentData = await enrolmentPayloadRequest(req);

  await Enrolment.create(
    [
      {
        ...createEnrolmentData,
        enrolledStatus: "WAITLISTED",
      },
    ],
    { session }
  );

  let { clubMembershipId } = req;
  let consentFilter = { clubMembershipId };
  let consentUpdate = {
    businessId,
    memberId,
    clubMembershipId,
    consent,
    newsletter,
  };
  let consentOption = {
    new: true,
    upsert: true,
  };
  await MemberConsent.findOneAndUpdate(
    consentFilter,
    consentUpdate,
    consentOption
  ).session(session);

  // // creating progress Record
  // const createProgressData = await progressPayloadRequest(req, enrolment);
  // await Progress.create([createProgressData], { session });

  // increment waitlist enrolled in business session
  await BusinessSession.findByIdAndUpdate(
    { _id: sessionId },
    { $inc: { waitcapacityfilled: 1 } }
  ).session(session);
};

module.exports = waitlistedEnrolment;
