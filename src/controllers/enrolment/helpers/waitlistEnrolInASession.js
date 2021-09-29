const progressPayloadRequest = require("./progressPayloadRequest");
const { BusinessSession, Enrolment, Progress } = require("../../../models");
const enrolmentPayloadRequest = require("./enrolmentPayloadRequest");

const waitlistEnrolment = async (req, session) => {
  let { sessionId } = req.body;

  // creating enrolment till session capacity
  const createEnrolmentData = await enrolmentPayloadRequest(req);

  let enrolment = await Enrolment.create(
    [
      {
        ...createEnrolmentData,
        enrolledStatus: "WAITLISTED",
      },
    ],
    { session }
  );

  // creating progress Record
  const createProgressData = await progressPayloadRequest(req, enrolment);
  await Progress.create([createProgressData], { session });

  // increment waitlist enrolled in business session
  await BusinessSession.findByIdAndUpdate(
    { _id: sessionId },
    { $inc: { waitcapacityfilled: 1 } }
  ).session(session);
};

module.exports = waitlistEnrolment;
