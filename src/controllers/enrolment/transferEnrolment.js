const mongoose = require("mongoose");
const { sessionTransferfunctionality } = require("./helpers");
const { SessionTransferEmail } = require("../../services/notification/Email");
const {  Enrolment, BusinessSession } = require("../../models");
const { findUserEmail } = require("../../helpers/user/findUserEmail");

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
    let enrolmentId = req.body.enrolmentId;
    let enrolment = await Enrolment.findById({_id:enrolmentId});
    let {memberId,sessionId,classId} = enrolment;
    let {userData,businessSessionData,businessClassData} = await findUserEmail(memberId,sessionId,classId);
    let {email}=userData;
    await sessionTransferfunctionality(req, session);
    await session.commitTransaction();
    let newSession = await BusinessSession.findById({_id:req.body.newSessionId});
    SessionTransferEmail.send({to:email},{userData,businessSessionData,businessClassData,newSession});
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
