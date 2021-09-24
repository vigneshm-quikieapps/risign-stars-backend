const mongoose = require("mongoose");
const Enrolment = require("../../models/Enrolment");
const BusinessSession = require("../../models/businessSession");

// cancel Membership
const withdrawEnrolment = async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    await Enrolment.findOneAndUpdate(
      { memberId: req.body.memberId, sessionId: req.body.sessionId },
      {
        $set: {
          enrolledStatus: "DROPPED",
          discontinuationReason: "DROPPED",
        },
      }
    ).session(session);

    await BusinessSession.findOneAndUpdate(
      { sessionId: req.body.sessionId },
      {
        $inc: { fullcapacityfilled: -1 },
      }
    ).session(session);

    await session.commitTransaction();

    console.log("success");

    return res.status(201).send({ message: "cancellation successfull" });
  } catch (err) {
    console.log("error");
    await session.abortTransaction();
    return res.status(422).send({ message: err.message });
  } finally {
    session.endSession();
  }
};

module.exports = withdrawEnrolment;
