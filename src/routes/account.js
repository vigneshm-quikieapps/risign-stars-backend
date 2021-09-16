const express = require("express");
const router = express.Router();

const account = require("../controllers/account");
const {
  forgotPasswordValidationRules,
  resetPasswordValidationRules,
  changePasswordValidationRules,
} = require("../validations/account");

const validate = require("../validations/validate");

router.post(
  "/account/password/forgot",
  forgotPasswordValidationRules(),
  validate,
  account.forgotPassword
);

router.post(
  "/account/password/reset",
  resetPasswordValidationRules(),
  validate,
  account.resetPassword
);

router.post(
  "/account/password/change",
  changePasswordValidationRules(),
  validate,
  account.changePassword
);

module.exports = router;
