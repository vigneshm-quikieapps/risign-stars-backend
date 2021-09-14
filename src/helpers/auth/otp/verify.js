const InvalidOTPError = require("../../../exceptions/InvalidOTPError");
const { length } = require("./constants");

/**
 *
 * @param {number} otp
 * @returns
 */
module.exports = (otp) => {
  if (!otp || String(otp).length !== length || otp !== 123456) {
    throw new InvalidOTPError();
  }
  return true;
};
