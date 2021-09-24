const BusinessSession = require("../../models/businessSession");
const Enrolment = require("../../models/Enrolment");
const classTransferEnrolmentPayloadRequest = require("./classTransferEnrolmentPayloadRequest");
const classTransferprogressPayloadRequest = require("./classTransferprogressPayloadRequest");
const { createProgress } = require("../progress");

/**
 * TODO:
 * 
 * 1. remove request.body for new enrolment while class transfer.
 * 
 * 2. change functionality of classTransferfunctionality in line 20
 *      so that current session Data is available for new session data while transfering
 * 
 * @param {*} bodyData 
 * @param {*} session 
 */


async function classTransferfunctionality(bodyData, session) {
  await Enrolment.findOneAndUpdate(
    {
      _id: bodyData.memberId,
      sessionId: bodyData.currentSessionId,
      classId: bodyData.classId,
    },
    {
      $set: {
        enrolledStatus: "DROPPED",
        discontinuationReason: "CLASS_TRANSFER",
      },
    }
  ).session(session);

  const createEnrolmentData = classTransferEnrolmentPayloadRequest(bodyData);

  await Enrolment.create({
    ...createEnrolmentData,
    enrolledStatus: "ENROLLED",
    discontinuationReason: "NONE",
  }).session(session);

  // creating progress Record

  const createProgressData = classTransferprogressPayloadRequest(bodyData);

  createProgress(createProgressData).session(session);

  // increment session enrolled in business session

  await BusinessSession.findByIdAndUpdate(
    { _id: bodyData.newSessionId },
    { $inc: { fullcapacityfilled: 1 } }
  ).session(session);

  await BusinessSession.findOneAndUpdate(
    { _id: bodyData.currentSessionId },
    {
      $inc: { fullcapacityfilled: -1 },
    }
  ).session(session);
}

module.exports = classTransferfunctionality;
