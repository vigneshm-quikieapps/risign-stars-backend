const OTPEmail = require("./OTPEmail");
const ResetPasswordEmail = require("./ResetPasswordEmail");
const VerifyEmail = require("./VerifyEmail");
const SuccessfullEnrollmentEmail =  require("./SuccessfullEnrollmentEmail");
const WithdrawEnrollmentEmail =  require("./WithdrawEnrollmentEmail");
const SessionTransferEmail =  require("./SessionTransferEmail");
const SuspendEmail =  require("./SuspendEmail");
const ReturnFromSuspensionEmail =  require("./ReturnFromSuspensionEmail");
const SuccessfullTrialEnrollmentEmail =  require("./SuccessfullTrialEnrollmentEmail");
const SignUpEmail =  require("./SignUpEmail");
const UpdateWaitListEnrolment =  require("./UpdateWaitListEnrolment");



module.exports = {
  OTPEmail,
  ResetPasswordEmail,
  VerifyEmail,
  SuccessfullEnrollmentEmail,
  WithdrawEnrollmentEmail,
  SessionTransferEmail,
  SuspendEmail,
  ReturnFromSuspensionEmail,
  SuccessfullTrialEnrollmentEmail,
  SignUpEmail,
  UpdateWaitListEnrolment
};
