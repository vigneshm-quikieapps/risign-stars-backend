const { Enrolment, BusinessSession } = require("../../../models");
const { generateEnrolmentBill } = require("./bill/generateEnrolmentBill");
const enrolmentPayloadRequest = require("./enrolmentPayloadRequest");

/**
 * It enrols member to a session with enrolment status "ENROLLED"
 * @param {*} req
 * @param {*} session
 */
const regularEnrolment = async (req, session) => {
  let { businessSessionData } = req;
  // creating enrolment till session capacity

  const createEnrolmentData = enrolmentPayloadRequest(req);
  await Enrolment.create(
    [
      {
        ...createEnrolmentData,
        enrolledStatus: "ENROLLED",
      },
    ],
    { session }
  );

  // creating progress Record
  /**
   * create progress is not required as per client on 28th of sept 2021
   */
  // const createProgressData = await progressPayloadRequest(req, enrolment);
  // await Progress.create([createProgressData], { session });

  // increment session enrolled in business session
  await BusinessSession.findByIdAndUpdate(
    { _id: businessSessionData.id },
    { $inc: { fullcapacityfilled: 1 } }
  ).session(session);

  generateEnrolmentBill({}, session);
};

module.exports = regularEnrolment;
