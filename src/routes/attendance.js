const express = require("express");
const router = express.Router();
  
const {
    createAttendanceOfAStudentInAClass,
    GetAllAttendanceOfAStudentInAClass,
    addAttendanceOfAStudentInAClass
} = require("../controllers/attendanceManagement/attendanceOfAStudentInAClass")

// const {
//     GetAllAttendanceOfAClassByDate,
//     createAttendanceOfAClassByDate,
//     addAttendanceOfAClassByDate
// } = require("../controllers/attendanceManagement/attendanceOfAClassByDate")


// const {
//     GetAllAttendanceOfAClassByMonth,
//     createAttendanceOfAClassByMonth,
//     addAttendanceOfAClassByMonth
// } = require("../controllers/attendanceManagement/attendanceOfAClassByMonth")

router.get("/attendance", GetAllAttendanceOfAStudentInAClass)
router.post("/attendance/create", createAttendanceOfAStudentInAClass)
router.put("/attendance/:id", addAttendanceOfAStudentInAClass)


// router.get("/attendance", GetAllAttendanceOfAClassByMonth)
// router.post("/attendance/create", createAttendanceOfAClassByMonth)
// router.put("/attendance/:id", addAttendanceOfAClassByMonth)


module.exports = router;