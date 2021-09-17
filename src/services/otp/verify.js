const InvalidOTPError = require("../../exceptions/InvalidOTPError");
const { length } = require("./constants");
const get = require("./get");

/**
 *
 * @param {number} otp
 * @returns
 */
module.exports = async (contact, otp) => {
  let key = `otp:${contact}`;

  if (!otp || String(otp).length !== length) {
    throw new InvalidOTPError();
  }

  let validOtp = await get(key);

  if (otp !== validOtp) {
    throw new InvalidOTPError();
  }

  return true;
};
