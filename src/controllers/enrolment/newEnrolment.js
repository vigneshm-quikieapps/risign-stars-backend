const mongoose = require("mongoose");
const {
  enrolInASession,
  getClubMembershipId,
  waitlistEnrolInASession,
} = require("./helpers");
const { Enrolment } = require("../../models");

/**
 * enrol a member into a class/session
 * @param {*} req
 * @param {*} res
 * @returns
 */
const newEnrolment = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    let { businessSessionData } = req;
    let { classId } = businessSessionData;
    let { memberId } = req.body;

    let { fullcapacityfilled, fullcapacity, waitcapacity, waitcapacityfilled } =
      businessSessionData;

    let numberOfMembersApplicable = fullcapacity + waitcapacity;
    let numberOfMembersApplied = fullcapacityfilled + waitcapacityfilled;

    /**
     * member should be enrolled only in one session for a particular class
     */
    let filterEnrolment = {
      classId,
      memberId: mongoose.Types.ObjectId(memberId),
    };

    let enrolment = await Enrolment.findOne(filterEnrolment);

    if (enrolment) {
      throw new Error(
        "member can enrol in only one session for a particular class"
      );
    }

    /**
     * check membership id of a member for this particular businessId (from members collections, membership array)
     * if available, get the membership id
     * else generate membership id and store it in the membership array
     */
    req.clubMembershipId = await getClubMembershipId(req, session);

    /**
     * if total number of students applied is greater than total number of applicable
     * numberOfMembersApplied: number of member applied
     * numberOfMembersApplicable: total number of members applicable should not be greater than the sum of fullCapacity and waitlistCapacity
     */
    if (numberOfMembersApplied >= numberOfMembersApplicable) {
      throw new Error("Maximum limit of enrolment is reached");
    }

    /**
     * if seats is available in fullCapacity, enrol the member
     * else waitlist the member
     */
    let message = "enrolled successful";
    if (fullcapacityfilled <= fullcapacity) {
      await enrolInASession(req, session);
    } else {
      // creating enrolment till session capacity
      message = "enrolled successful in waitlist";
      await waitlistEnrolInASession(req.body, session);
    }
    await session.commitTransaction();
    return res.status(201).send({ message });
  } catch (err) {
    console.log(err);
    await session.abortTransaction();
    return res.status(422).send({ message: err.message });
  } finally {
    session.endSession();
  }
};

module.exports = newEnrolment;
