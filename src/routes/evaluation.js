const express = require("express");
const router = express.Router();
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
router.post("/evaluation/create", createEvaluation);


// read routes
router.get("/evaluation/:evaluationId", getEvaluation);
  
//delete route
router.delete( "/evaluation/:evaluationId",deleteEvaluation);
  
//update route
router.put( "/evaluation/:evaluationId",updateEvaluation);
  
  
//listing route
router.get("/evaluation", getAllEvaluations);



module.exports = router;