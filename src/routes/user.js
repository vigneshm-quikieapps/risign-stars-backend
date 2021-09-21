/* eslint-disable prettier/prettier */
const express = require("express");
const { USER } = require("../contants/pages");
const { CREATE, UPDATE, READ, DELETE } = require("../contants/rest");
const router = express.Router();
const user = require("../controllers/user");
const { isAuthorized } = require("../middlewares/auth");
const {
  createUserValidationRules,
  updateUserValidationRules,
} = require("../validations/user");
const validate = require("../validations/validate");

// create route
router.post(
  "/users",
  isAuthorized(USER, CREATE),
  createUserValidationRules(),
  validate,
  user.create
);

// read route
router.get("/users/:userId", isAuthorized(USER, READ), user.get);

// delete route
router.delete("/users/:userId", isAuthorized(USER, DELETE), user.delete);

// update route
router.put(
  "/users/:userId",
  isAuthorized(USER, UPDATE),
  updateUserValidationRules(),
  validate,
  user.update
);

// listing route
router.get("/users", isAuthorized(USER, READ), user.getAll);

module.exports = router;
