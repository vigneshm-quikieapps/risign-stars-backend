const express = require("express");
const { CLASS_CATEGORY } = require("../constants/pages");
const { CREATE, UPDATE, DELETE } = require("../constants/rest");
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
const getResourceBusinessIdInCreate = require("../middlewares/auth/utils/getResourceBusinessId/getResourceBusinessIdInCreate");
const getResourceBusinessIdByCategoryId = require("../middlewares/auth/utils/getResourceBusinessId/getResourceBusinessIdByCategoryId");

// router.param("categoryId", getCategoryById);
//router.param("userId",getUserById);

// router.get("/category/:categoryId/",);
router.post(
  "/",
  isAuthorized(CLASS_CATEGORY, CREATE, {
    getResourceBusinessId: getResourceBusinessIdInCreate,
  }),
  createCategoryValidationRules(),
  validate,
  createCategory
);

router.get("/", getAllCategory);
router.get("/:categoryId", getCategory);
router.put(
  "/:categoryId",
  isAuthorized(CLASS_CATEGORY, UPDATE, {
    getResourceBusinessId: getResourceBusinessIdByCategoryId,
  }),
  updateCategoryValidationRules(),
  validate,
  updateCategory
);

router.delete(
  "/:categoryId",
  isAuthorized(CLASS_CATEGORY, DELETE, {
    getResourceBusinessId: getResourceBusinessIdByCategoryId,
  }),
  removeCategory
);

module.exports = router;
