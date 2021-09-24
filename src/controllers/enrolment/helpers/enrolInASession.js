const { Enrolment, BusinessSession, Progress } = require("../../../models");
const enrolmentPayloadRequest = require("./enrolmentPayloadRequest");
const progressPayloadRequest = require("./progressPayloadRequest");

const enrolInASession = async (req, session) => {
  let { businessSessionData } = req;
  // creating enrolment till session capacity

  const createEnrolmentData = enrolmentPayloadRequest(req);
  let enrolment = await Enrolment.create(
    [
      {
        ...createEnrolmentData,
        enrolledStatus: "ENROLLED",
      },
    ],
    { session }
  );

  // creating progress Record
  const createProgressData = await progressPayloadRequest(req, enrolment);
  await Progress.create([createProgressData], { session });

  // increment session enrolled in business session
  await BusinessSession.findByIdAndUpdate(
    { _id: businessSessionData.id },
    { $inc: { fullcapacityfilled: 1 } }
  ).session(session);
};

module.exports = enrolInASession;
