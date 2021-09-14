// Created by Prahalad
// routes for attendance management

const express = require("express");
const router = express.Router();

  
const {
    addAttendanceOfAStudentInAClass,
    GetAllAttendanceByDate,
    GetAllAttendanceOfAClassByMonth,
    GetAttendanceOfAStudentByDate,
    GetAttendanceOfAStudentByMonth,
} = require("../controllers/attendanceManagement")


const {
    addAttendance,
    classbydate,
    classbymonth,
    studentsbyclass,
    studentsbymonth
} = require("../validations/attendanceManagment")


//add attendance of a student in a class
router.put("/attendance/addattendance",addAttendance(), addAttendanceOfAStudentInAClass)


// get all the attendance of a class by date
router.get("/attendance/classbydate",classbydate(), GetAllAttendanceByDate)


// get all the attendance of a class by month
router.get("/attendance/classbymonth",classbymonth(), GetAllAttendanceOfAClassByMonth)


// get attendance of a student in a class by date
router.get("/attendance/studentbydate",studentsbyclass(), GetAttendanceOfAStudentByDate)


// get attendance of a student in a class by month
router.get("/attendance/studentbymonth",studentsbymonth(), GetAttendanceOfAStudentByMonth)


module.exports = router;