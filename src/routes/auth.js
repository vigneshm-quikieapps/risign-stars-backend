const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  logout,
  refreshToken,
  getOTPEmail,
  getOTPMobileNo,
} = require("../controllers/auth");

const { getMe } = require("../controllers/user");
const { isAuthorized } = require("../middlewares/auth");
const {
  getOTPEmailValidationRules,
  getOTPMobileNoValidationRules,
} = require("../validations/auth");
const {
  signUpValidationRules,
  signInValidationRules,
} = require("../validations/user");
const validate = require("../validations/validate");

router.post("/sign-up", signUpValidationRules(), validate, signup);
router.post("/sign-in", signInValidationRules(), validate, signin);
router.post("/logout", logout);
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

router.get("/auth/user/me", isAuthorized(null, null), getMe);

module.exports = router;
