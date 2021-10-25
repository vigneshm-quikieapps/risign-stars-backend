const mongoose = require("mongoose");
const { sessionTransferfunctionality } = require("./helpers");

// session transfer
const transferEnrolment = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    let { newSessionData } = req;
    let { fullcapacity, fullcapacityfilled } = newSessionData;

    if (fullcapacityfilled >= fullcapacity) {
      throw new Error("No Seats available in the session");
    }
    await sessionTransferfunctionality(req, session);
    await session.commitTransaction();
    return res.status(201).send({ message: "Transfer successful" });
  } catch (err) {
    console.error(err);
    await session.abortTransaction();
    return res.status(422).send({ message: err.message });
  } finally {
    session.endSession();
  }
};

module.exports = transferEnrolment;
