const mongoose = require("mongoose");
const enrolment = require("./enrolment");
const waitlistEnrolment = require("./waitlistEnrolment");

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

    let { fullcapacityfilled, fullcapacity, waitcapacity, waitcapacityfilled } =
      businessSessionData;

    let numberOfMembersApplicable = fullcapacity + waitcapacity;
    let numberOfMembersApplied = fullcapacityfilled + waitcapacityfilled;

    /**
     * check membership id of a member for this particular businessId (from members collections, membership array)
     * if available, get the membership id
     * else generate membership id and store it in the membership array
     */

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
    if (fullcapacityfilled <= fullcapacity) {
      await enrolment(req, session);
    } else {
      // creating enrolment till session capacit
      await waitlistEnrolment(req.body, session);
    }
    await session.commitTransaction();
    return res.status(201).send({ message: "enrolled Successful in waitlist" });
  } catch (err) {
    console.log("error");
    await session.abortTransaction();
    return res.status(422).send({ message: err.message });
  } finally {
    session.endSession();
  }
};

module.exports = newEnrolment;
