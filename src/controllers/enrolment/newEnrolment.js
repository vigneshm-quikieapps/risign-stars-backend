const mongoose = require("mongoose");
const enrolment = require("./enrolment");
const waitlistEnrolment = require("./waitlistEnrolment");

//createMember(Enrolment)
// module.exports.createEnrolment = async (req, res) => {
const newEnrolment = async (req, res) => {
  // let data = req.body;
  // return res.send({ data });
  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    let { businessSessionData } = req;

    let { fullcapacityfilled, fullcapacity, waitcapacity, waitcapacityfilled } =
      businessSessionData;

    let totalCapacity = fullcapacity + waitcapacity;
    let totalEnrollment = fullcapacityfilled + waitcapacityfilled;

    /**
     * check membership id of a member for this particular businessId (from members collections, membership array)
     * if available, get the membership id
     * else generate membership id and store it in the membership array
     */

    if (totalCapacity <= totalEnrollment) {
      throw new Error("Maximum limit of enrolment is reached");
    }

    if (fullcapacityfilled <= fullcapacity) {
      await enrolment(req.body, session);
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
