/* eslint-disable prettier/prettier */
const express = require("express");
const { USER } = require("../constants/pages");
const { CREATE, UPDATE, READ, DELETE } = require("../constants/rest");
const router = express.Router();
const user = require("../controllers/user");
const { isAuthorized } = require("../middlewares/auth");
const {
  createUserValidationRules,
  updateUserValidationRules,
} = require("../validations/user");
const validate = require("../validations/validate");
//super admin
// create route
router.post(
  "/",
  isAuthorized(USER, CREATE),
  createUserValidationRules(),
  validate,
  user.create
);

// read route
router.get("/:userId", isAuthorized(USER, READ), user.get);

/**
 * delete route
 * don't allow delete user functionality
 * if required, implement soft delete / deactivate / block functionality
 */
// router.delete("/:userId", isAuthorized(USER, DELETE), user.delete);

// update route
router.put(
  "/:userId",
  isAuthorized(USER, UPDATE),
  updateUserValidationRules(),
  validate,
  user.update
);

// listing route
router.get("/", isAuthorized(USER, READ), user.getAll);

/* 

  note: to sudharshan
  /businesess/:businessId/coaches

*/
module.exports = router;
