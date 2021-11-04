const User = require("../models/User");
const ResetPasswordEmail = require("../services/notification/Email/ResetPasswordEmail");
const { ResetPasswordSms } = require("../services/notification/Sms");
const { ResetPasswordOTP } = require("../services/otp");

/**
 * forgot password using email
 * @param {*} param0
 * @param {*} res
 * @returns
 */
module.exports.forgotPassword = async ({ user }, res) => {
  try {
    await ResetPasswordEmail.send({ user });

    return res.send({
      message: "Reset Password link has been sent to your email.",
    });
  } catch (err) {
    return res.send({ message: err.message });
  }
};

/**
 * reset password using email
 * @param {*} req
 * @param {*} res
 * @returns
 */
module.exports.resetPassword = async (req, res) => {
  try {
    let { user } = req;
    user.password = req.body.password;
    user.save();

    /** TODO: sent mail, password has been changed */

    return res.send({
      message: "Password has been reset successfully",
    });
  } catch (err) {
    return res.send({ message: err.message });
  }
};

/**
 * forgot password using mobileNo
 * @param {*} param0
 * @param {*} res
 * @returns
 */
module.exports.forgotPasswordMobile = async ({ user }, res) => {
  try {
    let otp = await ResetPasswordOTP.generate(user.mobileNo);
    ResetPasswordSms.send({ user, otp });

    return res.send({
      message: "Reset Password OTP has been sent to your mobile number.",
      otp,
    });
  } catch (err) {
    return res.send({ message: err.message });
  }
};

/**
 * reset password using mobileNo
 * @param {*} req
 * @param {*} res
 * @returns
 */
module.exports.resetPasswordMobile = async (req, res) => {
  try {
    let { user } = req;
    user.password = req.body.password;
    user.save();

    /** TODO: sent mail, password has been changed */

    return res.send({
      message: "Password has been reset successfully",
    });
  } catch (err) {
    return res.send({ message: err.message });
  }
};

module.exports.changePassword = async (req, res) => {
  try {
    let user = await User.findById(req.userId);
    user.password = req.body.newPassword;
    user.save();

    return res.send({
      message: "Password has been changed successfully",
    });
  } catch (err) {
    return res.send({ message: err.message });
  }
};
