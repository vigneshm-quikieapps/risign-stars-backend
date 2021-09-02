const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const {
  getBusinessIdById,
  getBusiness,
  getAllBusinesses,
  createBusiness,
  deleteBusiness,
  updateBusiness
} = require("../controllers/business");

//parameters
router.param("businessId", getBusinessIdById);

//all of actual routes
//all of actual routes
//create route
router.post(
  "/business/create",
  [
    check("name", "name should be at least 3 char").isLength({ min: 3 }),
    check("code", "code should be atleast 3 char")
      .optional()
      .isLength({ min: 3 }),
    check("tradename", "tradename should be at least 3 char").isLength({
      min: 3
    }),
    check("type", "type should be at least 3 char").isLength({ min: 3 }),
    check("about", "about should be atleast 3 char")
      .optional()
      .isLength({ min: 3 }),
    check("postcode", "postcode should be at least 3 char").isLength({
      min: 3
    }),
    check("line1", "line1 should be at least 3 char").isLength({ min: 3 }),
    check("city", "city should be at least 3 char").isLength({ min: 3 }),
    check("country", "country should be at least 3 char").isLength({ min: 3 })
  ],
  createBusiness
);

// read routes
router.get("/business/:businessId", getBusiness);

//delete route
router.delete("/business/:businessId", deleteBusiness);

//update route
router.put(
  "/business/:businessId",
  [
    check("name", "name should be at least 3 char")
      .optional()
      .isLength({ min: 3 }),
    check("code", "code should be atleast 3 char")
      .optional()
      .isLength({ min: 3 }),
    check("tradename", "tradename should be at least 3 char")
      .optional()
      .isLength({ min: 3 }),
    check("type", "type should be at least 3 char")
      .optional()
      .isLength({ min: 3 }),
    check("about", "about should be atleast 3 char")
      .optional()
      .isLength({ min: 3 }),
    check("postcode", "postcode should be at least 3 char")
      .optional()
      .isLength({ min: 3 }),
    check("line1", "line1 should be at least 3 char")
      .optional()
      .isLength({ min: 3 }),
    check("city", "city should be at least 3 char")
      .optional()
      .isLength({ min: 3 }),
    check("country", "country should be at least 3 char")
      .optional()
      .isLength({ min: 3 })
  ],
  updateBusiness
);

//listing route
router.get("/business", getAllBusinesses);

module.exports = router;
