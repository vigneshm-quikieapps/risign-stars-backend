const mongoose = require("mongoose");

const getClubMembershipId = require("./getClubMembershipId");
const trialEnrolmentHandler = require("./trialEnrolmentHandler");
const nonTrialEnrolmentHandler = require("./nonTrialEnrolmentHandler");

const { Enrolment } = require("../../../models");

/**
 * enrol a member into a class/session
 * @param {*} req
 * @param {*} res
 * @returns
 */
const newEnrolmentHandler = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    let { classId } = req.businessSessionData;
    let { memberId, isTrialEnrolment } = req.body;

    /**
     * member should be enrolled only in one session for a particular class
     */
    let filterEnrolment = {
      classId,
      memberId: mongoose.Types.ObjectId(memberId),
    };

    await Enrolment.canEnrol(filterEnrolment);

    /**
     * check membership id of a member for this particular businessId (from members collections, membership array)
     * if available, get the membership id
     * else generate membership id and store it in the membership array
     */
    req.clubMembershipId = await getClubMembershipId(req, session);

    let message = "enrolled successful";
    if (isTrialEnrolment) {
      message = await trialEnrolmentHandler(req, session);
    } else {
      message = await nonTrialEnrolmentHandler(req, session);
    }

    await session.commitTransaction();
    return res.status(201).send({ message });
  } catch (err) {
    console.error(err);
    await session.abortTransaction();
    return res.status(422).send({ message: err.message });
  } finally {
    session.endSession();
  }
};

module.exports = newEnrolmentHandler;
