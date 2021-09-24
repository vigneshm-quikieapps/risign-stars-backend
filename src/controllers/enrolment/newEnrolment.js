const BusinessSession = require("../../models/businessSession");

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
    const businessSessiondata = await BusinessSession.findOne({
      _id: req.body.sessionId,
    }).session(session);

    let totalCapacity =
      businessSessiondata.fullcapacity + businessSessiondata.waitcapacity;
    let totalEnrollment =
      businessSessiondata.fullcapacityfilled +
      businessSessiondata.waitcapacityfilled;

    if (totalCapacity <= totalEnrollment) {
      return res
        .status(201)
        .send({ message: "Maximum limit of enrolment is reached." });
    } else if (
      businessSessiondata.fullcapacityfilled <= businessSessiondata.fullcapacity
    ) {
      const member = await enrolment(req.body, session);

      if (member) {
        return res
          .status(201)
          .send({ message: "enrolled Successfully", member });
      }
    } else {
      // creating enrolment till session capacity

      let member = await waitlistEnrolment(req.body, session);

      await session.commitTransaction();

      console.log("success");

      return res.status(201).send({ message: "enrolled Successfully", member });
    }
  } catch (err) {
    console.log("error");
    await session.abortTransaction();
    return res.status(422).send({ message: err.message });
  } finally {
    session.endSession();
  }
};

module.exports = newEnrolment;
