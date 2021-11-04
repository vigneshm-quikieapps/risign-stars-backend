const OTPSms = require("../OTPSms");

const send = async ({ to, otp }) => {
  let body = `${otp} is the OTP for reset password`;
  return OTPSms.send({ to, body });
};

module.exports = send;
