const express = require("express");
const router = express.Router();
const {createEvaluationValidationRules, updateEvaluationValidationRules} = require("../validations/evaluation")

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
router.post("/evaluation/create",createEvaluationValidationRules(),createEvaluation);


// read routes
router.get("/evaluation/:evaluationId", getEvaluation);
  
//delete route
router.delete( "/evaluation/:evaluationId",deleteEvaluation);
  
//update route
router.put( "/evaluation/:evaluationId",updateEvaluationValidationRules(),updateEvaluation);
  
  
//listing route
router.get("/evaluation", getAllEvaluations);



module.exports = router;