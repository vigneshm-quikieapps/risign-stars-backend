const express = require("express");
const router = express.Router();

const account = require("../controllers/account");
const { isAuthenticated } = require("../middlewares/auth");
const {
  forgotPasswordValidationRules,
  resetPasswordValidationRules,
  changePasswordValidationRules,
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

router.post(
  "/password/change",
  isAuthenticated,
  changePasswordValidationRules(),
  validate,
  account.changePassword
);

module.exports = router;
