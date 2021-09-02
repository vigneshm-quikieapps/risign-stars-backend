const express = require("express");
const router = express.Router();



const {
    getBusinessIdById,
    getBusiness,
    getAllBusinesses,
    createBusiness,
    deleteBusiness,
    updateBusiness
} = require("../controllers/business");



//parameters
router.param("businessId",getBusinessIdById);


//all of actual routes
//all of actual routes
//create route
router.post("/business/create", createBusiness);


// read routes
router.get("/business/:businessId", getBusiness);
  
//delete route
router.delete( "/business/:businessId",deleteBusiness);
  
//update route
router.put( "/business/:businessId",updateBusiness);
  
  
//listing route
router.get("/business", getAllBusinesses);



module.exports = router;
  
