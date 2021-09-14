const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {
  signup,
  signin,
  isSignedIn,
  refreshToken,
  getOTP,
} = require("../controllers/auth");
const { createUserValidationRules } = require("../validations/user");
const validate = require("../validations/validate");
// ROUTES
// Signup Route
router.post(
  "/signup",
  [
    check("firstName", "name should be at least 2 char").isLength({ min: 3 }),
    check("lastName", "name should be at least 2 char").isLength({ min: 3 }),
    check("email", "email is required")
      .isEmail()
      .custom(createUserValidationRules),
    check("password", "password should be at least 3 char").isLength({
      min: 3,
    }),
    check("contact", "Contact must be 10 Digit No").isLength({
      min: 10,
      max: 10,
    }),
  ],
  signup
);

// Signin Route
router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("Please provide a valid Email"),

    check("password")
      .isLength({ min: 1 })
      .withMessage("Password Field is Requried")
      .matches(/\d/),
  ],
  signin
);

// Signout Route
// router.get("/signout", signout);

// REFRESH TOKEN
router.post("/refereshtoken", refreshToken);
router.post("/get-otp", getOTP);

// Testing Route
router.get("/testroute", isSignedIn, (req, res) => {
  res.json(req.auth);
});

module.exports = router;
