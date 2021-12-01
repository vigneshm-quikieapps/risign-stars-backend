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
const { isAuthorized } = require("../middlewares/auth");
const {
  getAllSessionsInATermValidationRules,
} = require("../validations/businessSession");
const {
  createTermValidationRules,
  updateTermValidationRules,
} = require("../validations/Term");
const validate = require("../validations/validate");
//buss
router.get(
  "/:termId/sessions",
  getAllSessionsInATermValidationRules(),
  validate,
  getAllSessionsInATerm
);
router.post(
  "/",
  isAuthorized(null, null),
  createTermValidationRules(),
  validate,
  createTerm
);

router.get("/", getAllTerm);
router.get("/:termId", getTerm);
router.put(
  "/:termId",
  isAuthorized(null, null),
  updateTermValidationRules(),
  validate,
  updateTerm
);

router.delete("/:termId", isAuthorized(null, null), deleteTerm);

module.exports = router;
