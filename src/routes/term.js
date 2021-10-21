const express = require("express");
const router = express.Router();
const { getAllSessionsInATerm } = require("../controllers/businessSession");

const {
  getTermIdById,
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

router.param("TermId", getTermIdById);

router.get(
  "/:termId/sessions",
  getAllSessionsInATermValidationRules(),
  validate,
  getAllSessionsInATerm
);
router.post("/", createTermValidationRules(), validate, createTerm);

router.get("/", getAllTerm);
router.get("/:TermId", getTerm);
router.put("/:TermId", updateTermValidationRules(), validate, updateTerm);

router.delete("/:TermId", deleteTerm);

module.exports = router;
