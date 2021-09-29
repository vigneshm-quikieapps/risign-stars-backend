const mongoose = require("mongoose");
const { BusinessSession, Enrolment, Progress } = require("../../models");

// update enrolment for waitlist
const updateWaitlistEnrolment = async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    const businessSessiondata = await BusinessSession.findOne({
      _id: req.body.sessionId,
    }).session(session);

    let capacityLeft =
      businessSessiondata.fullcapacity - businessSessiondata.fullcapacityfilled;

    let updatedEnrollemnt = await Enrolment.updateMany(
      { enrolledStatus: "WAITLISTED" },
      { enrolledStatus: "ENROLLED" }
    ).limit(capacityLeft);

    console.log(updatedEnrollemnt);
    // console.log(updatedEnrollemnt)
    // let createDocumentProgress = updatedEnrollemnt.map((li) => {
    //   return li.name, li.sessionId, li.classId, li.memberId;
    // });

    // await Progress.insertMany(createDocumentProgress).session(session);

    await BusinessSession.findOneAndUpdate(
      { sessionId: req.body.sessionId },
      {
        $inc: {
          fullcapacityfilled: capacityLeft,
          waitcapacityfilled: -capacityLeft,
        },
      }
    ).session(session);

    await session.commitTransaction();

    console.log("success");

    /** comment this because member is not defined due to commenting the above code. */
    // return res.status(201).send({ message: "enrolled Successfully", member });
  } catch (err) {
    console.log("error");
    await session.abortTransaction();
    return res.status(422).send({ message: err.message });
  } finally {
    session.endSession();
  }
};

module.exports = updateWaitlistEnrolment;
