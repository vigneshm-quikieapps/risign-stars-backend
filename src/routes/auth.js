const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  refreshToken,
  getOTPEmail,
  getOTPMobileNo,
} = require("../controllers/auth");
const {
  getAllClassesForALoggedInBusinessAdmin,
} = require("../controllers/businessClass");
const { isAuthorized } = require("../middlewares/auth");
const {
  getOTPEmailValidationRules,
  getOTPMobileNoValidationRules,
  refreshTokenValidationRules,
} = require("../validations/auth");
const {
  signUpValidationRules,
  signInValidationRules,
} = require("../validations/user");
const validate = require("../validations/validate");
const { verify } = require("jsonwebtoken");

router.post("/sign-up", signUpValidationRules(), validate, signup);
router.post("/sign-in", signInValidationRules(), validate, signin);
router.post("/refresh-token", refreshToken);
router.post(
  "/get-otp/email",
  getOTPEmailValidationRules(),
  validate,
  getOTPEmail
);
router.post(
  "/get-otp/mobile-no",
  getOTPMobileNoValidationRules(),
  validate,
  getOTPMobileNo
);

const isAuthHandler = (req, res) => {
  /** check if authenticated */
  try {
    let token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
    let tokenPayload = verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.authUserData = tokenPayload;

    return true;
  } catch (err) {
    return res.send({ message: err.message });
  }
};

router.get(
  "/auth/user/classes",
  isAuthorized(null, null, { isAuthHandler }),
  getAllClassesForALoggedInBusinessAdmin
);

// Testing Route
router.get("/testroute", (req, res) => {
  res.send("hello");
});

module.exports = router;
