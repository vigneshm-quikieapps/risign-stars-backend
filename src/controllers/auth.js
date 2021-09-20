const User = require("../models/User");
const { Otp } = require("../services");
const { Email, Sms } = require("../services/notification");
const DoesNotExistError = require("../exceptions/DoesNotExistError");
const expressJwt = require("express-jwt");
const { generateTokens, RefreshToken } = require("../services/auth");
const { VerifyEmail } = require("../services/notification/Email");

// Signup Method
module.exports.signup = async (req, res) => {
  try {
    let data = req.body;
    data = { ...data, emailVerfied: true, mobileNoVerfified: true };
    await User.create(data);
    return res.status(201).send({ message: "created successfully" });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

// Signed Method
module.exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user || !user.isValidPassword(password)) {
      throw new DoesNotExistError();
    }

    let data = generateTokens({ user });
    RefreshToken.send(res, data.refreshToken);

    return res.send(data);
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
    const user = await User.findById(req.userId);
    const data = generateTokens({ user });
    return res.send(data);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

/**
 * validate
 * 1. check if mobile number is valid
 *
 * method for sending the otp via appropriate channel (e.g. sms, email)
 * @param {*} otp
 */
const sendOTPViaSMS = async ({ to, otp }) => {
  let payload = {
    body: `${otp} is the OTP for your phone verification`,
    to,
  };
  try {
    let response = await Sms.send(payload);
    console.log({ response });
  } catch (err) {
    console.error(err);
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
    let otp = await Otp.generate(mobileNo);

    sendOTPViaSMS({ to: mobileNo, otp });
    return res.send({ message: `OTP has been sent to ${mobileNo}`, otp });
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};

const sendOTPViaEmail = ({ to, otp }) => {
  console.log({ to, otp });
  const msg = {
    to: "tomonso.ejang@gmail.com", // Change to your recipient
    from: "sarphu@quikieapps.com", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: `<strong>${otp} is the OTP for your email verification</strong>`,
  };
  Email.send(msg);
};

module.exports.getOTPEmail = async (req, res) => {
  try {
    let { email } = req.body;
    let otp = await Otp.generate(email);

    sendOTPViaEmail({ to: email, otp });
    VerifyEmail.send({ to: email, otp });
    return res.send({ otp });
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};
