const express = require("express");
const router = express.Router();
const user = require("../controllers/user")
const {createUserValidationRules, updateUserValidationRules}  = require("../validations/user")
const validate = require("../validations/validate")

// create route
router.post("/users", createUserValidationRules(), validate, user.create);

// read route
router.get("/users/:userId", user.get);
  
// delete route
router.delete("/users/:userId",user.delete);
  
// update route
router.put("/users/:userId", updateUserValidationRules(), validate, user.update);
  
// listing route
router.get("/users", user.getAll);

module.exports = router;