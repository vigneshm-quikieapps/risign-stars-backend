const express = require("express");
const router = express.Router();
const role = require("../controllers/role");
const {
  createRoleValidationRules,
  updateRoleValidationRules,
} = require("../validations/role");
const validate = require("../validations/validate");

// create route
router.post("/roles", createRoleValidationRules(), validate, role.create);

// read routes
router.get("/roles/:roleId", role.get);

//delete route
router.delete("/roles/:roleId", role.delete);

//update route
router.put(
  "/roles/:roleId",
  updateRoleValidationRules(),
  validate,
  role.update
);

//listing route
router.get("/roles", role.getAll);

module.exports = router;
