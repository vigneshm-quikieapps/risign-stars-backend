/* eslint-disable prettier/prettier */
const express = require("express");
const { ROLES } = require("../constants/pages");
const { CREATE, READ, UPDATE, DELETE } = require("../constants/rest");
const router = express.Router();
const role = require("../controllers/role");
const { isAuthorized } = require("../middlewares/auth");
const {
  createRoleValidationRules,
  updateRoleValidationRules,
} = require("../validations/role");
const validate = require("../validations/validate");
//super admin
// create route
router.post(
  "/",
  isAuthorized(null, null, { isSuperAdminOnly: true }),
  createRoleValidationRules(),
  validate,
  role.create
);

// read routes
router.get(
  "/:roleId",
  isAuthorized(null, null, { isSuperAdminOnly: true }),
  role.get
);

//delete route
router.delete(
  "/:roleId",
  isAuthorized(null, null, { isSuperAdminOnly: true }),
  role.delete
);

//update route
router.put(
  "/:roleId",
  isAuthorized(null, null, { isSuperAdminOnly: true }),
  updateRoleValidationRules(),
  validate,
  role.update
);

//listing route
router.get("/", role.getAll);

module.exports = router;
