const { body } = require("express-validator");
const { RefreshToken } = require("../services/auth");
const { isValidMobile } = require("./mobileNo");

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
    let userData = RefreshToken.verify(refreshToken);
    req.authUserData = userData;
    return true;
  } catch (err) {
    return Promise.reject(err.message);
  }
};

// const refreshTokenValidationRules = () => {
//   return [
//     body("refreshToken", "Invalid token")
//       .exists()
//       .bail()
//       .custom(verifyRefreshToken),
//   ];
// };

module.exports = {
  getOTPEmailValidationRules,
  getOTPMobileNoValidationRules,
  // refreshTokenValidationRules,
};
