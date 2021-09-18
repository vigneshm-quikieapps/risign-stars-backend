const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const {
  getTermIdById,
  createTerm,
  getTerm,
  getAllTerm,
  updateTerm,
  deleteTerm,
} = require("../controllers/Term");
const { businessIdValidation } = require("../validations/businessClass");

router.param("TermId", getTermIdById);

router.post(
  "/Term/create",
  [
    check("business").custom(businessIdValidation),
    check("code", "code should be a Numbre/Integer  ").isInt(),
    check("label", "label should be atleast 3 chatecters").isLength({ min: 3 }),
    check("startdate", "starttime   should be a date").isDate({
      format: "MM-DD-YYYY",
    }),
    check("startdate", "endtime   should be a date").isDate({
      format: "MM-DD-YYYY",
    }),
    check(
      "classsequence",
      "classsequence should be a Numbre/Integer  "
    ).isInt(),
    check("updatedBy", "updatedBy should be a valid userId")
      .optional()
      .isLength({ min: 12 }),
    check("createdBy", "createdBy should be a valid userId").isLength({
      min: 12,
    }),
  ],
  createTerm
);

router.get("/Term", getAllTerm);
router.get("/Term/:TermId", getTerm);
router.put(
  "/Term/:TermId",
  [
    check("business").optional().custom(businessIdValidation),
    check("code", "code should be a Numbre/Integer  ").optional().isInt(),
    check("label", "label should be atleast 3 chatecters")
      .optional()
      .isLength({ min: 3 }),
    check(
      "startdate",
      "starttime   should be a date in format: 'MM-DD-YYYY'"
    ).optional(),
    check(
      "startdate",
      "endtime   should be a date in format: 'MM-DD-YYYY'"
    ).optional(),
    check("classsequence", "classsequence should be a Numbre/Integer  ")
      .optional()
      .isInt(),
    check("updatedBy", "updatedBy should be a valid userId").isLength({
      min: 12,
    }),
  ],
  updateTerm
);

router.delete("/Term/:TermId", deleteTerm);

module.exports = router;
