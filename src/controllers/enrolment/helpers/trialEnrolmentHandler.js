const enrolmentPayloadRequest = require("./enrolmentPayloadRequest");
const { Enrolment } = require("../../../models");
const generateTrialBill = require("../../../helpers/bill/generateTrialBill");

const trialEnrolmentHandler = async (req, session) => {
  const createEnrolmentData = enrolmentPayloadRequest(req);
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

  return "enrolled in trial session successful";
};

module.exports = trialEnrolmentHandler;
