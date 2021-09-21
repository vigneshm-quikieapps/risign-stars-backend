const OTPSms = require("../OTPSms");

const send = async ({ to, otp }) => {
  let body = `${otp} is the OTP for verifying your number`;
  return OTPSms.send({ to, body });
};

module.exports = send;
