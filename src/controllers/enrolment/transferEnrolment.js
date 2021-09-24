const BusinessSession = require("../../models/businessSession");
const mongoose = require("mongoose");
const classTransferfunctionality = require("./classTransferFunctionality");

// class transfer
const transferEnrolment = async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    const newBusinessSessiondata = await BusinessSession.findOne({
      _id: req.body.SessionId,
    }).session(session);

    if (
      newBusinessSessiondata.fullcapacity >
      newBusinessSessiondata.fullcapacityfilled
    ) {
      await classTransferfunctionality(req.body, session);
    }

    await session.commitTransaction();

    console.log("success");

    return res.status(201).send({ message: "Enroled successful" });
  } catch (err) {
    console.log("error");
    await session.abortTransaction();
    return res.status(422).send({ message: err.message });
  } finally {
    session.endSession();
  }
};

module.exports = transferEnrolment;
