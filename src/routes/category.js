const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const { getCategoryById,createCategory,getCategory,getAllCategory, updateCategory,removeCategory } = require("../controllers/category");
const { checkIsUnique } = require("../validations/Category")




router.param("categoryId",getCategoryById);
//router.param("userId",getUserById);

//router.get("/category/:categoryId/",);
router.post("/category/create", [
    check("name", "name should be at least 3 char").isLength({ min: 3 }).custom(checkIsUnique),
      check("updatedBy", "updatedBy should be a valid userId").optional().isLength({ min: 12 }),
    check("createdBy", "createdBy should be a valid userId").isLength({ min: 12 }),
  
], createCategory);

router.get("/category",getAllCategory);
router.get("/category/:categoryId",getCategory);
router.put("/category/:categoryId",[
    check("name", "name should be at least 3 char").isLength({ min: 3 }),
    check("updatedBy", "updatedBy should be a valid userId").isLength({ min: 12 }),
   
  ],updateCategory);

router.delete("/category/:categoryId",removeCategory);


module.exports = router;