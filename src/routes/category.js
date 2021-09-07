const express = require("express");
const router = express.Router();

//const { getUserById } = require("../controllers/user");
const { getCategoryById,createCategory,getCategory,getAllCategory, updateCategory,removeCategory } = require("../controllers/category");





router.param("categoryId",getCategoryById);
//router.param("userId",getUserById);

//router.get("/category/:categoryId/",);
router.post("/category/create",createCategory);
router.get("/category",getAllCategory);
router.get("/category/:categoryId",getCategory);
router.put("/category/:categoryId",updateCategory);
router.delete("/category/:categoryId",removeCategory);


module.exports = router;