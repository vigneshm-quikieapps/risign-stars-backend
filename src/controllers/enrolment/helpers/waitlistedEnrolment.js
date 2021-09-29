const { BusinessSession, Enrolment } = require("../../../models");
const enrolmentPayloadRequest = require("./enrolmentPayloadRequest");

const waitlistedEnrolment = async (req, session) => {
  let { sessionId } = req.body;

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
