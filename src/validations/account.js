const DoesNotExistError = require("../exceptions/DoesNotExistError");
const { USER } = require("../contants/validation");
const ResetPasswordEmail = require("../services/notification/Email/ResetPasswordEmail");
const { body } = require("express-validator");
const User = require("../models/User");
const { AccessToken } = require("../services/auth");

const isRegisteredEmail = async (email, { req }) => {
  try {
    let user = await User.findOne({ email });

    if (!user) {
      throw new DoesNotExistError();
    }

    req.user = user;
    return true;
  } catch (err) {
    console.error(err);
    return Promise.reject("Email not found");
  }
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
};
