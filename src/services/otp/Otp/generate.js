const { length, expiresIn } = require("../../../constants/otp");
const otpGenerator = require("otp-generator");
const set = require("./set");
const get = require("./get");

/**
 * contact may either be email or mobileNo
 * generates OTP
 * 1. if the recently generated otp has not yet expired, it will generate the same otp
 * @param {*} contact
 * @returns
 */
module.exports = async (key) => {
  let otp = await get(key);

  if (!otp) {
    otp = await otpGenerator.generate(length, {
      alphabets: false,
      upperCase: false,
      specialChars: false,
    });
  }

  await set(key, otp, "EX", expiresIn);

  return otp;
};
