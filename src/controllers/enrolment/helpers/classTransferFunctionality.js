const mongoose = require("mongoose");
const { BusinessSession, Enrolment, Progress } = require("../../../models");
const classTransferEnrolmentPayloadRequest = require("./classTransferEnrolmentPayloadRequest");

/**
 * @param {*} bodyData
 * @param {*} session
 */

async function classTransferfunctionality(req, session) {
  let { enrolmentId, newSessionId } = req.body;

  const createEnrolmentData = classTransferEnrolmentPayloadRequest(req);

  /**
   * Enroling a member to a new session
   */
  let newEnrolment = await Enrolment.create(
    [
      {
        ...createEnrolmentData,
        enrolledStatus: "ENROLLED",
      },
    ],
    { session }
  );

  newEnrolment = newEnrolment[0];

  /** marking the current enrolment as dropped and class transfer */
  let enrolmentBeforeUpdate = Enrolment.findOneAndUpdate(
    {
      _id: mongoose.Types.ObjectId(enrolmentId),
    },
    {
      $set: {
        enrolledStatus: "DROPPED",
        discontinuationReason: "CLASS_TRANSFER",
        droppedDate: new Date(),
        transferedTo: newEnrolment.id,
      },
    }
  ).session(session);

  let { enrolledStatus } = enrolmentBeforeUpdate;
  let incrementSessionPayload = {};
  if (enrolledStatus === "ENROLLED") {
    incrementSessionPayload = { fullcapacityfilled: -1 };
  } else if (enrolledStatus === "WAITLISTED") {
    incrementSessionPayload = { waitcapacityfilled: -1 };
  }

  /**
   * Progress is not required.
   */
  // /**
  //  * moving the progress record to be used with the new enrolment
  //  */
  // await Progress.findOneAndUpdate(
  //   {
  //     enrolmentId: mongoose.Types.ObjectId(enrolmentId),
  //   },
  //   {
  //     $set: {
  //       enrolmentId: newEnrolment.id,
  //       sessionId: newSessionId,
  //     },
  //   },
  //   { new: true }
  // ).session(session);

  // decrement in the current businsess session when member has been enrolled
  await BusinessSession.findOneAndUpdate(
    { _id: req.enrolmentData.sessionId },
    {
      $inc: incrementSessionPayload,
    }
  ).session(session);

  // increment in the new businsess session when member has been enrolled
  await BusinessSession.findByIdAndUpdate(
    { _id: req.body.newSessionId },
    { $inc: { fullcapacityfilled: 1 } }
  ).session(session);
}

module.exports = classTransferfunctionality;
