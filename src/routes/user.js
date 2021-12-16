/* eslint-disable prettier/prettier */
const express = require("express");
const router = express.Router();
const user = require("../controllers/user");
const { isAuthorized } = require("../middlewares/auth");
const {
  createUserValidationRules,
  updateUserValidationRules,
} = require("../validations/user");
const validate = require("../validations/validate");
const { USERS } = require("../constants/pages");
const { CREATE, UPDATE, READ, DELETE } = require("../constants/rest");
//super admin
// create route
router.post(
  "/",
  // isAuthorized(null, null, { isSuperAdminOnly: true }),
  isAuthorized(USERS, CREATE),
  createUserValidationRules(),
  validate,
  user.create
);

// read route
router.get(
  "/:userId",
  // isAuthorized(null, null, { isSuperAdminOnly: true }),
  isAuthorized(USERS, READ),
  user.get
);

/**
 * delete route
 * don't allow delete user functionality
 * if required, implement soft delete / deactivate / block functionality
 */
// router.delete("/:userId", isAuthorized(USER, DELETE), user.delete);

// update route
router.put(
  "/:userId",
  // isAuthorized(null, null, { isSuperAdminOnly: true }),
  isAuthorized(USERS, UPDATE),
  updateUserValidationRules(),
  validate,
  user.update
);

// listing route
router.get(
  "/",
  // isAuthorized(null, null, { isSuperAdminOnly: true }),
  isAuthorized(USERS, READ),
  user.getAll
);

router.delete("/:userId", isAuthorized(USERS, DELETE), user.delete);

module.exports = router;
