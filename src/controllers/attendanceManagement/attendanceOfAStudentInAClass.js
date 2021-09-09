// Created by Prahalad
// controller for attendance management

// const mongoose = require('mongoose');
const AttendanceOfAStudentInAClass = require("../../models/attendanceManagement/attendanceOfAStudentInAClass ")
const AttendanceOfAClassByDate = require("../../models/attendanceManagement/attendanceOfAClassByDate")
const AttendanceOfAClassByMonth = require("../../models/attendanceManagement/attendanceOfAClassByMonth")


//get all attendance of a student in a class

exports.GetAllAttendanceOfAStudentInAClass = async (req, res) => {
  try {
    const activity = await AttendanceOfAStudentInAClass.find({});

    if (!activity) {
      return res
        .status(200)
        .json({ success: true, message: "No attendance added." });
    } else {
      res.status(200).json({
        success: true,
        message: "Showing attendance of student in a class...",
        activity: activity,
      });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};



//create attendance of a student in a class

module.exports.createAttendanceOfAStudentInAClass = async (req, res) => {

  // const session = await mongoose.startSession();

  try {
     
    // session.startTransaction(); 

    const addNewStudent = new AttendanceOfAStudentInAClass(req.body);
    await addNewStudent.save()

    // const addNewStudent = new AttendanceOfAClassByDate(req.body);
    // await addNewStudent.save().session(session)

    res
      .status(201)
      .json({ success: true, message: "New student added.", product: addNewStudent });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}



//add attendance of a student in a class

module.exports.addAttendanceOfAStudentInAClass = async(req, res) => {


  AttendanceOfAStudentInAClass.bulkWrite(
    req.body.members.map((member) => 
      ({
        updateOne: {
          filter: { studentId: member.id, classId: req.body.classId },
          update: { 
            $push: {
              records: [
                {
                  date: req.body.date,
                  attended: member.attended,
                  tardy: req.body.tardy,
                  comments: req.body.comments,
                }
              ]
            } 
          },
          upsert: true
        }
      })
    )
  )

    
  // AttendanceOfAStudentInAClass.findOneAndUpdate(
  //   { 
  //     studentId: req.params.id,
  //     classId: req.body.classId
  //   },
  //   { 
  //     $push: {
  //         records: [
  //           {
  //             date: req.body.date,
  //             attended: req.body.attended,
  //             tardy: req.body.tardy,
  //             comments: req.body.comments,
  //           }
  //         ]
  //     },
  //     $inc: req.body.attended && { "attendedCount": 1 },
  //     $inc: req.body.tardyCount && { "tardyCount": 1 }
  //   },
  //   { new: true, useFindAndModify: false },
  //   (err, attendance) => {
  //       if (err) {
  //         return res.status(400).json({
  //             err: "attendance updation failed",
  //         });
  //       }

  //       res.json(attendance);
  //   }
  // );

  

  // const addNewStudent = new AttendanceOfAClassByDate(req.body);
  // await addNewStudent.save()


  // AttendanceOfAClassByMonth.findOneAndUpdate(
  //   { 
  //     classId: req.body.classId, 
  //     month: req.body.month,
  //     "members.id": req.params.id
  //   },
  //   { 
  //     $inc: { "attendedCount": 1 },
  //     $inc: { "tardyCount": 1 }
  //   },
  //   { new: true, useFindAndModify: false },
  //   (err, attendance) => {
  //       if (err) {
  //           return res.status(400).json({
  //               err: "attendance updation failed",
  //           });
  //       }

  //       res.json(attendance);
  //   }
  // );
    
}


