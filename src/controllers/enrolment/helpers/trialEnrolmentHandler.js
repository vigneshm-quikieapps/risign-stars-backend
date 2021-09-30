const enrolmentPayloadRequest = require("./enrolmentPayloadRequest");
const { Enrolment } = require("../../../models");

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
  return "enrolled in trial session successful";
};

module.exports = trialEnrolmentHandler;
