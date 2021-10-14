const mongoose = require("mongoose");
const Enrolment = require("../../models/Enrolment");
const BusinessSession = require("../../models/businessSession");
const { cancelAllFutureBills } = require("../../helpers/bill");
const { STATUS_RETURN_FROM_SUSPENSION } = require("../../constants/enrolment");
const activateAllFutureBills = require("../../helpers/bill/activateAllFutureBills");

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

  try {
    let { enrolmentId } = req.params;
    let enrolment = await Enrolment.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(enrolmentId) },
      {
        $set: {
          enrolledStatus: STATUS_RETURN_FROM_SUSPENSION,
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
