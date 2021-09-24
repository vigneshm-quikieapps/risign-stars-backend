const Enrolment = require("../../models/Enrolment");
const BusinessSession = require("../../models/businessSession");
const { createProgress } = require("../progress");
const enrolmentPayloadRequest = require("./enrolmentPayloadRequest");
const progressPayloadRequest = require("./enrolmentPayloadRequest");

const enrolment = async (bodyData, session) => {
  // creating enrolment till session capacity

  const createEnrolmentData = enrolmentPayloadRequest(bodyData);

  await Enrolment.create({
    ...createEnrolmentData,
    enrolledStatus: "ENROLLED",
    discontinuationReason: "NONE",
  }).session(session);

  // creating progress Record

  const createProgressData = progressPayloadRequest(bodyData);

  createProgress(createProgressData).session(session);

  // increment session enrolled in business session

  await BusinessSession.findByIdAndUpdate(
    { _id: bodyData.sessionId },
    { $inc: { fullcapacityfilled: 1 } }
  ).session(session);
};

module.exports = enrolment;
