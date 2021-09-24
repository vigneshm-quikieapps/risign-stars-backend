const BusinessSession = require("../../models");
const Enrolment = require("../../models/Enrolment");
const enrolmentPayloadRequest = require("./enrolmentPayloadRequest");

const waitlistEnrolment = async (bodyData, session) => {
  // creating enrolment till session capacity

  const createEnrolmentData = await enrolmentPayloadRequest(bodyData);

  await Enrolment.create({
    ...createEnrolmentData,
    enrolledStatus: "WAITLISTED",
    discontinuationReason: "NONE",
  }).session(session);

  // increment waitlist enrolled in business session
  /**
   * Note: get session here
   */
  let sessionId = "";

  await BusinessSession.findByIdAndUpdate(
    { _id: sessionId },
    { $inc: { waitcapacityfilled: 1 } }
  ).session(session);
};

module.exports = waitlistEnrolment;
