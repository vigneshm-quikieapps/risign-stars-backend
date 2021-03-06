const {
  STATUS_WAITLISTED,
  ENUM_TRANSFER_ALLOWED,
} = require("../../../constants/enrolment");
const { BusinessSession, Enrolment } = require("../../../models");

/**
 * @param {*} bodyData
 * @param {*} session
 */

const sessionTransferfunctionality = async (req, session) => {
  let { enrolmentId, newSessionId } = req.body;

  // const createEnrolmentData = sessionTransferEnrolmentPayloadRequest(req);

  // /**
  //  * Enroling a member to a new session
  //  */
  // let newEnrolment = await Enrolment.create(
  //   [
  //     {
  //       ...createEnrolmentData,
  //       enrolledStatus: "ENROLLED",
  //     },
  //   ],
  //   { session }
  // );

  // newEnrolment = newEnrolment[0];

  /** marking the current enrolment as dropped and class transfer */
  // let enrolmentBeforeUpdate = Enrolment.findOneAndUpdate(
  //   {
  //     _id: mongoose.Types.ObjectId(enrolmentId),
  //   },
  //   {
  //     $set: {
  //       enrolledStatus: "DROPPED",
  //       discontinuationReason: "CLASS_TRANSFER",
  //       droppedDate: new Date(),
  //       transferedTo: newEnrolment.id,
  //     },
  //   }
  // ).session(session);

  let enrolmentBeforeUpdate = await Enrolment.findById(enrolmentId);

  let { enrolledStatus } = enrolmentBeforeUpdate;

  /**
   * decrement the current session filled capacity
   */
  let incrementSessionPayload = {};
  if (ENUM_TRANSFER_ALLOWED.includes(enrolledStatus)) {
    incrementSessionPayload = { fullcapacityfilled: -1 };
  } else if (enrolledStatus === STATUS_WAITLISTED) {
    incrementSessionPayload = { waitcapacityfilled: -1 };
  }

  /**
   * Progress is not required.
   */

  /**
   * moving the progress record to be used with the new enrolment
   */

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

  /**
   * decrement in the current (fullcapacityfilled/waitlistedfilled) business session
   * when member has been enrolled
   */

  await BusinessSession.findOneAndUpdate(
    { _id: req.enrolmentData.sessionId },
    {
      $inc: incrementSessionPayload,
    }
  ).session(session);

  /**
   * increment in the new business session when member has been enrolled
   */
  await BusinessSession.findByIdAndUpdate(
    { _id: req.body.newSessionId },
    { $inc: { fullcapacityfilled: 1 } }
  ).session(session);

  /**
   * update the session id to new session id in the enrolment
   */
  await Enrolment.updateOne(
    { _id: enrolmentId },
    { sessionId: newSessionId },
    { session }
  );
};
module.exports = sessionTransferfunctionality;
