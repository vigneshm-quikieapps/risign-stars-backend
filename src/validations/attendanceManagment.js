// Created by Prahalad
// validation for attendance management


const { check } = require("express-validator");


//validation for add attendance of a student in a class
module.exports.addAttendance = () => {
    return [
        check("sessionId", "sessionId should be at least 3 char").isLength({ min: 3 }).isString(),
        check("classId", "classId should be at least 3 char").isLength({ min: 3 }).isString(),
        check("className", "className should be at least 3 char").isLength({ min: 3 }).isString(),
        check("date", "date should be a string in Date format like \"yyyy-mm-dd\"").isDate(),
        check("attendanceMonth", "date should be a string in Date format like \"yyyy-mm-dd\"").isDate(),
        check("members", "levels should be a array").isArray(),
        
    ]
}


// validation for get all the attendance of a class by date
module.exports.classbydate = () => {
    return [
        check("sessionId", "sessionId should be at least 3 char").isLength({ min: 3 }).isString(),
        check("classId", "classId should be at least 3 char").isLength({ min: 3 }).isString(),
        check("date", "date should be a string in Date format like \"yyyy-mm-dd\"").isDate(),
        
    ]
}


// validation for get all the attendance of a class by month
module.exports.classbymonth = () => {
    return [
        check("sessionId", "sessionId should be at least 3 char").isLength({ min: 3 }).isString(),
        check("classId", "classId should be at least 3 char").isLength({ min: 3 }).isString(),
        check("attendancemonth", "attendancemonth should be a Number between 1 to 12").isInt({ min:1, max: 12}),
        check("year", "year should be a Number , format like \"yyyy\". eg: 2021").isInt(),
        
    ]
}


// validation for get attendance of a student in a class by date
module.exports.studentsbyclass = () => {
    return [
        check("sessionId", "sessionId should be at least 3 char").isLength({ min: 3 }).isString(),
        check("classId", "classId should be at least 3 char").isLength({ min: 3 }).isString(),
        check("date", "date should be a string in Date format like \"yyyy-mm-dd\"").isDate(),
        check("id", "id should be a string").isString().isLength({min: 3}),
        
    ]
}


// validation for get attendance of a student in a class by month
module.exports.studentsbymonth = () => {
    return [
        check("sessionId", "sessionId should be at least 3 char").isLength({ min: 3 }).isString(),
        check("classId", "classId should be at least 3 char").isLength({ min: 3 }).isString(),
        check("attendancemonth", "attendancemonth should be a Number between 1 to 12").isInt({ min:1, max: 12 }),
        check("year", "year should be a Number , format like \"yyyy\". eg: 2021").isInt(),
        check("id", "id should be a string").isString().isLength({min: 3}),
    ]
}