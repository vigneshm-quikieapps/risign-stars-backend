const OTPEmail = require("./OTPEmail");
const ResetPasswordEmail = require("./ResetPasswordEmail");
const VerifyEmail = require("./VerifyEmail");
const SuccessfullEnrollmentEmail =  require("./SuccessfullEnrollmentEmail");
const WithdrawEnrollmentEmail =  require("./WithdrawEnrollmentEmail");
const SessionTransferEmail =  require("./SessionTransferEmail");
const SuspendEmail =  require("./SuspendEmail");
const ReturnFromSuspensionEmail =  require("./ReturnFromSuspensionEmail");

module.exports = {
  OTPEmail,
  ResetPasswordEmail,
  VerifyEmail,
  SuccessfullEnrollmentEmail,
  WithdrawEnrollmentEmail,
  SessionTransferEmail,
  SuspendEmail,
  ReturnFromSuspensionEmail
};
