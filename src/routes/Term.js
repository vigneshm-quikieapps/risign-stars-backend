const express = require("express");
const router = express.Router();

const { getTermIdById,createTerm,getTerm,getAllTerm, updateTerm,deleteTerm } = require("../controllers/Term");





router.param("TermId",getTermIdById);



router.post("/Term/create",createTerm);
router.get("/Term",getAllTerm);
router.get("/Term/:TermId",getTerm);
router.put("/Term/:TermId",updateTerm);
router.delete("/Term/:TermId",deleteTerm);


module.exports = router;