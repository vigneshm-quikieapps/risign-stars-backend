const express = require("express");
const router = express.Router();

const account = require("../controllers/account");
const { isAuthenticated } = require("../middlewares/auth");
const {
  forgotPasswordValidationRules,
  resetPasswordValidationRules,
  changePasswordValidationRules,
  resetPasswordMobileValidationRules,
  forgotPasswordMobileValidationRules,
} = require("../validations/account");

const validate = require("../validations/validate");

/**
 * RBAC not required in this endpoints
 */
router.post(
  "/password/forgot",
  forgotPasswordValidationRules(),
  validate,
  account.forgotPassword
);

router.post(
  "/password/reset",
  resetPasswordValidationRules(),
  validate,
  account.resetPassword
);

/**
 * forgot password using mobile
 */
router.post(
  "/password/forgot/using-mobile-no",
  forgotPasswordMobileValidationRules(),
  validate,
  account.forgotPasswordMobile
);

router.post(
  "/password/reset/using-mobile-no",
  resetPasswordMobileValidationRules(),
  validate,
  account.resetPasswordMobile
);

router.post(
  "/password/change",
  isAuthenticated,
  changePasswordValidationRules(),
  validate,
  account.changePassword
);

module.exports = router;
