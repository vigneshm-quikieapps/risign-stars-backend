const mongoose = require("mongoose");
const Enrolment = require("../../models/Enrolment");
const BusinessSession = require("../../models/businessSession");
const { cancelAllFutureBills } = require("../../helpers/bill");
const { STATUS_SUSPEND } = require("../../constants/enrolment");
const { SuspendEmail } = require("../../services/notification/Email");
const { findUserEmail } = require("../../helpers/user/findUserEmail");

// cancel Membership
const suspendEnrolment = async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    let { enrolmentId } = req.params;
    let now = new Date();

    let enrolment = await Enrolment.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(enrolmentId) },
      {
        $set: {
          enrolledStatus: STATUS_SUSPEND,
          suspendedAt: now,
        },
      },
      { new: true }
    ).session(session);

    let { sessionId } = enrolment;
    let sessionData = await BusinessSession.findById(sessionId);

    /**
     * cancel all future bills
     */
    let { memberId } = enrolment;
    let data = { memberId, sessionData };
    await cancelAllFutureBills(data, session);
    let {userData,businessSessionData,businessClassData} = await findUserEmail(memberId,'',sessionData.classId);
    let {email}=userData;
    await session.commitTransaction();
    SuspendEmail.send({to:email},{userData,sessionData,businessClassData});
    return res.status(201).send({ message: "suspension successful" });
  } catch (err) {
    console.error(err);
    await session.abortTransaction();
    return res.status(422).send({ message: err.message });
  } finally {
    session.endSession();
  }
};

module.exports = suspendEnrolment;
