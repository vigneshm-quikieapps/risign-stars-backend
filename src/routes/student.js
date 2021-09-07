const express = require("express")
const router = express.Router()

const student = require("../controllers/student")

const {
    createStudentValidationRules,
    updateStudentValidationRules
} = require("../validations/student")

const validate = require("../validations/validate");

// create route
router.post("/student", createStudentValidationRules(), validate, student.create);

// read routes
router.get("/student/:studentId", student.get);

//delete route
router.delete("/student/:studentId", student.delete);

// update route
router.put(
    "/student/:studentId",
    updateStudentValidationRules(),
    validate,
    student.update
);

module.exports = router;