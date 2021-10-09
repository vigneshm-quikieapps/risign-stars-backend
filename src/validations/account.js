const DoesNotExistError = require("../exceptions/DoesNotExistError");
const { USER } = require("../contants/validation");
const ResetPasswordEmail = require("../services/notification/Email/ResetPasswordEmail");
const { body } = require("express-validator");
const User = require("../models/User");
const { AccessToken } = require("../services/auth");
const { isValidMobile } = require("./mobileNo");
const { ResetPasswordOTP } = require("../services/otp");

/**
 * filter should be and object containing either email/mobileNo
 * e.g let filter = { email }
 * e.g let filter = { mobileNo }
 *
 * @param {*} filter
 * @param {*} param1
 * @returns
 */
const isRegisteredUser = async (filter, { req }) => {
  try {
    let user = await User.findOne(filter);

    if (!user) {
      throw new DoesNotExistError();
    }

    req.user = user;
    return true;
  } catch (err) {
    console.error(err);
    return Promise.reject("User not found");
  }
};

const isRegisteredEmail = async (email, params) => {
  return isRegisteredUser({ email }, params);
};

const isRegisteredMobile = async (mobileNo, params) => {
  return isRegisteredUser({ mobileNo }, params);
};

const isValidResetPasswordToken = async (token, { req }) => {
  try {
    let userId = await ResetPasswordEmail.verifyToken({ token });
    let user = await User.findById(userId);
    req.user = user;
    return true;
  } catch (err) {
    console.error(err);
    return Promise.reject("Invalid Reset Password Token");
  }
};

const isValidResetPasswordOTP = async (otp, { req }) => {
  try {
    let contact = req.body.mobileNo;

    const valid = await ResetPasswordOTP.verify(contact, otp);

    if (!valid) {
      throw new Error("invalid");
    }

    return true;
  } catch (err) {
    console.error(err);
    return Promise.reject("Invalid Reset Password OTP");
  }
};

const forgotPasswordValidationRules = () => {
  return [
    body("email", "Invalid email").isEmail().bail().custom(isRegisteredEmail),
  ];
};

const resetPasswordValidationRules = () => {
  return [
    body("password", USER.PASSWORD.MESSAGE).isLength({
      min: USER.PASSWORD.LENGTH,
    }),
    body("token", "Invalid Token").custom(isValidResetPasswordToken),
  ];
};

/**
 * forgot password using mobile validation
 * @returns
 */
const forgotPasswordMobileValidationRules = () => {
  return [
    body("mobileNo", "Invalid mobile number")
      .custom(isValidMobile)
      .bail()
      .custom(isRegisteredMobile),
  ];
};

/**
 * reset password using mobile validation
 * @returns
 */
const resetPasswordMobileValidationRules = () => {
  return [
    body("mobileNo", "Invalid mobile number")
      .custom(isValidMobile)
      .bail()
      .custom(isRegisteredMobile),
    body("password", USER.PASSWORD.MESSAGE).isLength({
      min: USER.PASSWORD.LENGTH,
    }),
    body("otp", "Invalid otp").custom(isValidResetPasswordOTP),
  ];
};

const confirmPasswordRules = (confirmNewPassword, { req }) => {
  if (req.body.newPassword !== confirmNewPassword) {
    return Promise.reject(
      "new password and confirm new password should be equal"
    );
  }
  return true;
};

const checkPassword = async (currentPassword, { req }) => {
  try {
    let accessToken = req.headers.authorization;
    let userId = AccessToken.verify(accessToken);
    let user = await User.findById(userId);

    if (!user || !user.isValidPassword(currentPassword)) {
      throw new DoesNotExistError();
    }
    req.userId = userId;

    return true;
  } catch (err) {
    return Promise.reject("Incorrect current password");
  }
};

const changePasswordValidationRules = () => {
  return [
    body("currentPassword", "Invalid Current Password")
      .isLength({
        min: USER.PASSWORD.LENGTH,
      })
      .custom(checkPassword),
    body("newPassword", "Invalid New Password").isLength({
      min: USER.PASSWORD.LENGTH,
    }),
    body("confirmNewPassword", "Confirm New Password")
      .isLength({
        min: USER.PASSWORD.LENGTH,
      })
      .custom(confirmPasswordRules),
  ];
};

module.exports = {
  forgotPasswordValidationRules,
  resetPasswordValidationRules,
  changePasswordValidationRules,
  forgotPasswordMobileValidationRules,
  resetPasswordMobileValidationRules,
};
