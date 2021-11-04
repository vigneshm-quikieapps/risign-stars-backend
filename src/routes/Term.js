const express = require("express");
const router = express.Router();

const {
  getTermIdById,
  createTerm,
  getTerm,
  getAllTerm,
  updateTerm,
  deleteTerm,
} = require("../controllers/Term");
const {
  createTermValidationRules,
  updateTermValidationRules,
} = require("../validations/Term");
const validate = require("../validations/validate");

router.param("TermId", getTermIdById);

router.post("/", createTermValidationRules(), validate, createTerm);

router.get("/", getAllTerm);
router.get("/:TermId", getTerm);
router.put("/:TermId", updateTermValidationRules(), validate, updateTerm);

router.delete("/:TermId", deleteTerm);

module.exports = router;
