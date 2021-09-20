const { body } = require("express-validator");
const { lookup } = require("../services/mobile");
const { RefreshToken } = require("../services/auth");

const isValidMobile = async (mobileNo) => {
  /** mobile no is required */
  if (!mobileNo) {
    return Promise.reject("Mobile number is required");
  }

  /** check if the mobile no is valid */
  try {
    let phone_number = await lookup(mobileNo);
    if (!phone_number) {
      throw new Error();
    }
    return true;
  } catch (err) {
    console.error(err);
    return Promise.reject("Please enter a valid mobile number");
  }
};

const getOTPEmailValidationRules = () => {
  return [body("email", "should be a valid Email").isEmail()];
};

const getOTPMobileNoValidationRules = () => {
  return [
    body("mobileNo", "should be a valid mobile number").custom(isValidMobile),
  ];
};

const verifyRefreshToken = (refreshToken, { req }) => {
  try {
    let userId = RefreshToken.verify(refreshToken);
    req.userId = userId;
    return true;
  } catch (err) {
    return Promise.reject(err.message);
  }
};

const refreshTokenValidationRules = () => {
  return [
    body("refreshToken", "Invalid token").exists().custom(verifyRefreshToken),
  ];
};

module.exports = {
  getOTPEmailValidationRules,
  getOTPMobileNoValidationRules,
  refreshTokenValidationRules,
};
