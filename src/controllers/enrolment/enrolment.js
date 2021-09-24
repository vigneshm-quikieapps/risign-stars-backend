const { Enrolment, BusinessSession, Progress } = require("../../models");
const { createProgress } = require("../progress");
const enrolmentPayloadRequest = require("./enrolmentPayloadRequest");
const progressPayloadRequest = require("./progressPayloadRequest");

const enrolment = async (req, session) => {
  let { sessionData } = req;
  // creating enrolment till session capacity

  const createEnrolmentData = enrolmentPayloadRequest(req);

  await Enrolment.create({
    ...createEnrolmentData,
    enrolledStatus: "ENROLLED",
    discontinuationReason: "NONE",
  }).session(session);

  // creating progress Record
  const createProgressData = progressPayloadRequest(req);
  await Progress.create();
  createProgress(createProgressData).session(session);

  // increment session enrolled in business session
  await BusinessSession.findByIdAndUpdate(
    { _id: sessionData.id },
    { $inc: { fullcapacityfilled: 1 } }
  ).session(session);
};

module.exports = enrolment;
