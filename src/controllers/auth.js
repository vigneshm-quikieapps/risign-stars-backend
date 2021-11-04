const User = require("../models/User");
const { VerifyMobileSms } = require("../services/notification/Sms");
const DoesNotExistError = require("../exceptions/DoesNotExistError");
const expressJwt = require("express-jwt");
const { generateTokens, RefreshToken } = require("../services/auth");
const { OTPEmail } = require("../services/notification/Email");
const { VerifyContactOTP } = require("../services/otp");

// Signup Method
module.exports.signup = async (req, res) => {
  try {
    let data = req.body;
    data = { ...data, mobileNoVerified: true };
    await User.create(data);
    return res.status(201).send({ message: "created successfully" });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

module.exports.logout = async (req, res) => {
  try {
    RefreshToken.send(req, "");
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};

// Signed Method
module.exports.signin = async (req, res) => {
  try {
    const { mobileNo, password } = req.body;

    let user = await User.findOne({ mobileNo });

    if (!user || !user.isValidPassword(password)) {
      throw new DoesNotExistError();
    }

    let data = generateTokens({ user });
    RefreshToken.send(res, data.refreshToken);

    let userData = JSON.parse(JSON.stringify(user));
    delete userData.password;

    return res.send({ ...data, user: userData });
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};

// Protected Routes
module.exports.isSignedIn = expressJwt({
  // in this middleware the next() is already there or written in expressJwt so we no need to specify explicitely
  secret: "TEMPU",
  algorithms: ["RSA", "sha1", "RS256", "HS256"],
  userProperty: "auth", // this middleware put this auth onto the request
});

// custom middlewares
module.exports.isAuthenticated = (req, res, next) => {
  //  isAuthenticated means user can change things in his own account
  const checker = req.profile && req.auth && req.profile._id == req.auth._id; // through a frontend we will set a property called profile, and this property is only going to set if user is login
  if (!checker) {
    res.status(403).json({
      error: "ACCESS DENIED",
    });
  }

  next();
};

// Refresh Token
module.exports.refreshToken = async (req, res) => {
  try {
    const token = req.cookies && req.cookies.jid;
    if (!token) {
      return res.send({
        ok: false,
        accessToken: "",
        message: "refresh token not found",
      });
    }

    let payload = null;
    try {
      payload = RefreshToken.verify(token);
    } catch (err) {
      console.error(err);
      return res.send({
        ok: false,
        accessToken: "",
        message: "invalid refresh token",
      });
    }

    let userId = payload._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.send({
        ok: false,
        accessToken: "",
        message: "user does not exist",
      });
    }

    const data = generateTokens({ user });
    let { refreshToken } = data;

    RefreshToken.send(res, refreshToken);
    return res.send(data);
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};

/**
 * generate the otp, send the otp via appropriate channel (e.g. sms, email)
 * @param {*} req
 * @param {*} res
 * @returns
 */
module.exports.getOTPMobileNo = async (req, res) => {
  try {
    let { mobileNo } = req.body;
    let otp = await VerifyContactOTP.generate(mobileNo);
    VerifyMobileSms.send({ to: mobileNo, otp });
    return res.send({ message: `OTP has been sent to ${mobileNo}`, otp });
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};

module.exports.getOTPEmail = async (req, res) => {
  try {
    let { email } = req.body;
    let otp = await VerifyContactOTP.generate(email);
    OTPEmail.send({ to: email, otp });
    return res.send({ otp, message: "OTP has been sent to email" });
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};
