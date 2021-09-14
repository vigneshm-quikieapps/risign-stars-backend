const { length } = require("./constants");
const otpGenerator = require("otp-generator");
const set = require("./set");
const get = require("./get");

/**
 * generates OTP
 * 1. if the recently generated otp has not yet expired, it will generate the same otp
 * @param {*} key
 * @returns
 */
module.exports = async (key) => {
  let otp = await get(`otp:${key}`);

  if (!otp) {
    otp = await otpGenerator.generate(length, {
      alphabets: false,
      upperCase: false,
      specialChars: false,
    });
  }

  await set(`otp:${key}`, otp, "EX", "60");

  return otp;
};
