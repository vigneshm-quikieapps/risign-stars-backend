const sendSms = require("../sendSms");

const send = async ({ to, otp }) => {
  let payload = {
    body: `${otp} is the OTP for your phone verification`,
    to,
  };
  try {
    let response = await sendSms(payload);
    console.log({ response });
  } catch (err) {
    console.error(err);
  }
};

module.exports = send;
