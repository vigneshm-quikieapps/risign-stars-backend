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
const { CREATE, DELETE, UPDATE, READ } = require("../constants/rest");
const { SESSION_TERM } = require("../constants/pages");
const getResourceBusinessIdInCreate = require("../middlewares/auth/utils/getResourceBusinessId/getResourceBusinessIdInCreate");
const getResourceBusinessIdByTermId = require("../middlewares/auth/utils/getResourceBusinessId/getResourceBusinessIdByTermId");

//buss
router.get(
  "/:termId/sessions",
  getAllSessionsInATermValidationRules(),
  validate,
  getAllSessionsInATerm
);
router.post(
  "/",
  isAuthorized(SESSION_TERM, CREATE, {
    getResourceBusinessId: getResourceBusinessIdInCreate,
  }),
  createTermValidationRules(),
  validate,
  createTerm
);

router.get("/", getAllTerm);
router.get("/:termId", getTerm);
router.put(
  "/:termId",
  isAuthorized(SESSION_TERM, UPDATE, {
    getResourceBusinessId: getResourceBusinessIdByTermId,
  }),
  updateTermValidationRules(),
  validate,
  updateTerm
);

router.delete(
  "/:termId",
  isAuthorized(SESSION_TERM, DELETE, {
    getResourceBusinessId: getResourceBusinessIdByTermId,
  }),
  deleteTerm
);

module.exports = router;
