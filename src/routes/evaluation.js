const express = require("express");
const router = express.Router();
const { check } = require("express-validator");


const {
    getAllEvaluations,
    getEvaluationIdById,
    getEvaluation,
    createEvaluation,
    deleteEvaluation,
    updateEvaluation
} = require("../controllers/evaluation");



//parameters
router.param("evaluationId",getEvaluationIdById);


//all of actual routes
//all of actual routes
//create route
router.post("/evaluation/create",[
    check("name", "name should be at least 3 char").isLength({ min: 3 }),
    check("levelcount", "levelcount should be an Integer").isInt(),
    check("levels", "password should be at least 3 char").isLength({ min: 1 })
  ],createEvaluation);


// read routes
router.get("/evaluation/:evaluationId", getEvaluation);
  
//delete route
router.delete( "/evaluation/:evaluationId",deleteEvaluation);
  
//update route
router.put( "/evaluation/:evaluationId",updateEvaluation);
  
  
//listing route
router.get("/evaluation", getAllEvaluations);



module.exports = router;