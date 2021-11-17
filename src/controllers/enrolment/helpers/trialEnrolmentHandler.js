const enrolmentPayloadRequest = require("./enrolmentPayloadRequest");
const { Enrolment } = require("../../../models");
const generateTrialBill = require("../../../helpers/bill/generateTrialBill");
const { SuccessfullTrialEnrollmentEmail } = require("../../../services/notification/Email");
const { findUserEmail } = require("../../../helpers/user/findUserEmail");

const trialEnrolmentHandler = async (req, session) => {
  const createEnrolmentData = enrolmentPayloadRequest(req);
  let sessionData = req.businessSessionData;
  let { memberId } = req.body;
  await Enrolment.create(
    [
      {
        ...createEnrolmentData,
        enrolledStatus: "TRIAL_ENROLLED",
      },
    ],
    { session }
  );

  /**
   * generate bill.
   */
  await generateTrialBill(req, session);
  let {userData,businessSessionData,businessClassData} = await findUserEmail(memberId,sessionData.id,sessionData.classId);
  let {email}=userData;
  SuccessfullTrialEnrollmentEmail.send({to:email},{userData,businessSessionData,businessClassData});

  return "enrolled in trial session successful";
};

module.exports = trialEnrolmentHandler;
