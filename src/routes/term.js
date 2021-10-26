const express = require("express");
const router = express.Router();
const { getAllSessionsInATerm } = require("../controllers/businessSession");

const {
  createTerm,
  getTerm,
  getAllTerm,
  updateTerm,
  deleteTerm,
} = require("../controllers/term");
const {
  getAllSessionsInATermValidationRules,
} = require("../validations/businessSession");
const {
  createTermValidationRules,
  updateTermValidationRules,
} = require("../validations/Term");
const validate = require("../validations/validate");

router.get(
  "/:termId/sessions",
  getAllSessionsInATermValidationRules(),
  validate,
  getAllSessionsInATerm
);
router.post("/", createTermValidationRules(), validate, createTerm);

router.get("/", getAllTerm);
router.get("/:termId", getTerm);
router.put("/:termId", updateTermValidationRules(), validate, updateTerm);

router.delete("/:termId", deleteTerm);

module.exports = router;
