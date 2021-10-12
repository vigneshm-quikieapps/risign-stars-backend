const { Types } = require("mongoose");
const { generateEnrolmentBill } = require("../../../helpers/bill");
const {
  Enrolment,
  BusinessSession,
  BusinessClass,
  BusinessFinance,
} = require("../../../models");

const enrolmentPayloadRequest = require("./enrolmentPayloadRequest");

/**
 * It enrols member to a session with enrolment status "ENROLLED"
 * creates a consent
 * creates a additional info if the member/parents wants to receive notification.
 *
 * @param {*} req
 * @param {*} session
 */
const regularEnrolment = async (req, session) => {
  let { businessSessionData, memberId } = req;
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

  /**
   * generate bill
   */
  let businessFinanceData = await BusinessFinance.findOne({
    businessId: Types.ObjectId(sessionData.businessId),
  });
  let classData = await BusinessClass.findById(sessionData.classId);
  let sessionData = businessSessionData;
  let data = { businessFinanceData, classData, sessionData, memberId };

  // await generateEnrolmentBill(data, session);

  /** TODO: send Email */
};

module.exports = regularEnrolment;
