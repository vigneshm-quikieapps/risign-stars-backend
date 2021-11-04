const mongoose = require("mongoose");
const Enrolment = require("../../models/Enrolment");
const BusinessSession = require("../../models/businessSession");
const { cancelAllFutureBills } = require("../../helpers/bill");

// cancel Membership
const withdrawEnrolment = async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    let { enrolmentId } = req.params;
    let enrolment = await Enrolment.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(enrolmentId) },
      {
        $set: {
          enrolledStatus: "DROPPED",
          discontinuationReason: "DROPPED",
        },
      },
      { new: true }
    ).session(session);

    let sessionData = await BusinessSession.findOneAndUpdate(
      { sessionId: req.body.sessionId },
      {
        $inc: { fullcapacityfilled: -1 },
      },
      { new: true }
    ).session(session);

    /**
     * cancel all future bills
     */
    let { memberId } = enrolment;
    let data = { memberId, sessionData };
    await cancelAllFutureBills(data, session);

    await session.commitTransaction();
    return res.status(201).send({ message: "cancellation successfull" });
  } catch (err) {
    console.error(err);
    await session.abortTransaction();
    return res.status(422).send({ message: err.message });
  } finally {
    session.endSession();
  }
};

module.exports = withdrawEnrolment;
