const User = require("../models/User");
const ResetPasswordEmail = require("../services/notification/Email/ResetPasswordEmail");

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

module.exports.resetPassword = async (req, res) => {
  try {
    let { user } = req;
    user.password = req.body.password;
    user.save();

    /** TODO: sent mail, password has been changed */

    return res.send({
      message: "Password has been reset successfully",
      user,
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
      user,
    });
  } catch (err) {
    return res.send({ message: err.message });
  }
};
