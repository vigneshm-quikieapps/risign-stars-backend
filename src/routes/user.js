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
  "/",
  isAuthorized(USER, CREATE),
  createUserValidationRules(),
  validate,
  user.create
);

// read route
router.get("/:userId", isAuthorized(USER, READ), user.get);

// delete route
router.delete("/:userId", isAuthorized(USER, DELETE), user.delete);

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
router.get(
  "/coaches/:businessId",
  isAuthorized(USER, READ),
  user.getAllCoach
);

module.exports = router;
