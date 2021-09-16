const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

//const deleteBusinessActivityValidationRules= require("../validations/businessActivityClass")


const {
    getBusinessSessionIdById,
    getBusinessSession,
    getAllBusinessSession,
    createBusinessSession,
    updateBusinessSession,
    deleteBusinessSession
} = require("../controllers/businessSession");
const { termIdValidation } = require("../validations/businessSession");




//parameters
router.param("businessSessionId", getBusinessSessionIdById);

//all of actual routes
// eslint-disable-next-line prettier/prettier
//all of actual routes
//create route
router.post(
  "/businessSession/create",[
    check("name", "name should be at least 3 char").isLength({ min: 3 }),
    check("term").custom(termIdValidation),
    check("pattern.*.day", "pattern day  should be an  in [mon, tue, wed, thu, fri, sat, sun]").isIn("mon", "tue", "wed", "thu", "fri", "sat", "sun"),
    check("pattern.*.starttime", "starttime   should be a date in format: 'MM-DD-YYYY'").isDate({format: 'MM-DD-YYYY'}),
    check("pattern.*.endtime", "endtime   should be a date in format: 'MM-DD-YYYY'").isDate({format: 'MM-DD-YYYY'}),
    check("fullcapacity", "fullcapacity should be a Numbre/Integer  ").optional().isInt(),
    check("waitcapacity", "waitcapacity should be a Numbre/Integer  ").optional().isInt(),
    check("coach", "coach should be a Coach Id and it should not be Empty!!").isLength({ min: 10 }),
    check("updatedBy", "updatedBy should be a valid userId").optional().isLength({ min: 12 }),
    check("createdBy", "createdBy should be a valid userId").isLength({ min: 12 }),
  
   ],createBusinessSession
);

// read routes
router.get("/businessSession/:businessSessionId", getBusinessSession);

//delete route
router.delete("/businessSession/:businessSessionId", deleteBusinessSession);

//update route
router.put(
  "/businessSession/:businessSessionId",[
    check("name", "name should be at least 3 char").optional().isLength({ min: 3 }),
    check("term").optional().custom(termIdValidation),
    check("pattern.*.day", "pattern day  should be an  in [mon, tue, wed, thu, fri, sat, sun]").optional().isIn("mon", "tue", "wed", "thu", "fri", "sat", "sun"),
    check("pattern.*.starttime", "starttime   should be a date in format: 'MM-DD-YYYY'").optional().isDate({format: 'MM-DD-YYYY'}),
    check("pattern.*.endtime", "endtime   should be a date in format: 'MM-DD-YYYY'").optional().isDate({format: 'MM-DD-YYYY'}),
    check("fullcapacity", "fullcapacity should be a Numbre/Integer  ").optional().isInt(),
    check("waitcapacity", "waitcapacity should be a Numbre/Integer  ").optional().isInt(),
    check("coach", "coach should be a Coach Id and it should not be Empty!!").optional().isLength({ min: 10 }),
    check("updatedBy", "updatedBy should be a valid userId").isLength({ min: 12 }),
  
  
   ],updateBusinessSession
);
//listing route
router.get(
  "/businessSession",
    getAllBusinessSession
);

module.exports = router;
