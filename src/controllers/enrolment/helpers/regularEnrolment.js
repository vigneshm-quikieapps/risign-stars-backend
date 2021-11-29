const { Types } = require("mongoose");
const { generateEnrolmentBill } = require("../../../helpers/bill");
const {
  Enrolment,
  BusinessSession,
  BusinessClass,
  BusinessFinance,
  MemberConsent,
} = require("../../../models");

const enrolmentPayloadRequest = require("./enrolmentPayloadRequest");
const {
  SuccessfullEnrollmentEmail,
} = require("../../../services/notification/Email");
const { findUserEmail } = require("../../../helpers/user/findUserEmail");

/**
 * It enrols member to a session with enrolment status "ENROLLED"
 * creates a consent
 * creates a additional info if the member/parents wants to receive notification.
 *
 * @param {*} req
 * @param {*} session
 */
const regularEnrolment = async (req, session) => {
  let { memberData } = req;
  let { businessId, memberId, consent, newsletter } = req.body;
  let sessionData = req.businessSessionData;
  // creating enrolment till session capacity

  const createEnrolmentData = enrolmentPayloadRequest(req);
  let { clubMembershipId } = createEnrolmentData;

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

  /**
   * create or update member consent, newsletter
   */
  let consentFilter = { clubMembershipId };
  let consentUpdate = {
    businessId,
    memberId,
    clubMembershipId,
    consent,
    newsletter,
  };
  let consentOption = {
    new: true,
    upsert: true,
  };
  await MemberConsent.findOneAndUpdate(
    consentFilter,
    consentUpdate,
    consentOption
  ).session(session);

  // increment session enrolled in business session
  await BusinessSession.findByIdAndUpdate(
    { _id: sessionData.id },
    { $inc: { fullcapacityfilled: 1 } }
  ).session(session);

  /**
   * generate bill
   */
  let businessFinanceData = await BusinessFinance.findOne({
    businessId: Types.ObjectId(sessionData.businessId),
  });
  let classData = await BusinessClass.findById(sessionData.classId);

  let enrolmentBillData = {
    businessFinanceData,
    classData,
    sessionData,
    memberData,
    clubMembershipId,
  };
  await generateEnrolmentBill(enrolmentBillData, session);

  /** TODO: send Email */
  let classId = sessionData.classId;
  let { userData, businessSessionData, businessClassData } =
    await findUserEmail(memberId, sessionData.id, classId);
  let { email } = userData;
  SuccessfullEnrollmentEmail.send(
    { to: email },
    { userData, businessSessionData, businessClassData }
  );
};

module.exports = regularEnrolment;
