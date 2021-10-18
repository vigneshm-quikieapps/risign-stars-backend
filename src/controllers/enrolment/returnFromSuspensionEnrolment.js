const mongoose = require("mongoose");
const { BusinessSession, Enrolment, BusinessClass } = require("../../models");
const { STATUS_RETURN_FROM_SUSPENSION } = require("../../constants/enrolment");
const { activateAllFutureBills } = require("../../helpers/bill");

/**
 * return from suspension
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const returnFromSuspensionEnrolment = async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  let now = new Date();

  try {
    let { enrolmentId } = req.params;
    let enrolmentData = await Enrolment.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(enrolmentId) },
      {
        $set: {
          enrolledStatus: STATUS_RETURN_FROM_SUSPENSION,
          returnFromSuspensionAt: now,
        },
      },
      { new: true }
    ).session(session);

    let { sessionId } = enrolmentData;
    let sessionData = await BusinessSession.findById(sessionId);

    /**
     * cancel all future bills
     */
    let { memberId, classId } = enrolmentData;
    let classData = await BusinessClass.findById(classId);
    let data = { memberId, sessionData, classData, enrolmentData, now };
    await activateAllFutureBills(data, session);

    await session.commitTransaction();
    return res
      .status(201)
      .send({ message: "return from suspension successful" });
  } catch (err) {
    console.error(err);
    await session.abortTransaction();
    return res.status(422).send({ message: err.message });
  } finally {
    session.endSession();
  }
};

module.exports = returnFromSuspensionEnrolment;
