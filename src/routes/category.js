const express = require("express");
const router = express.Router();

const {
  // getCategoryById,
  createCategory,
  getCategory,
  getAllCategory,
  updateCategory,
  removeCategory,
} = require("../controllers/category");
const { isAuthorized } = require("../middlewares/auth");
const {
  updateCategoryValidationRules,
  createCategoryValidationRules,
} = require("../validations/Category");
const validate = require("../validations/validate");

// router.param("categoryId", getCategoryById);
//router.param("userId",getUserById);

// router.get("/category/:categoryId/",);
router.post(
  "/",
  isAuthorized(null, null),
  createCategoryValidationRules(),
  validate,
  createCategory
);

router.get("/", getAllCategory);
router.get("/:categoryId", getCategory);
router.put(
  "/:categoryId",
  updateCategoryValidationRules(),
  validate,
  updateCategory
);

router.delete("/:categoryId", removeCategory);

module.exports = router;
