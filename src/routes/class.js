const express = require("express")
const router = express.Router();

const _class = require("../controllers/class");
const { createClassValidationRules } = require("../validations/class");
const validate = require("../validations/validate");

router.get("/class", _class.getAll);
router.get("/class/:id", _class.get);
router.post("/class",createClassValidationRules(),validate, _class.create);


module.exports = router;