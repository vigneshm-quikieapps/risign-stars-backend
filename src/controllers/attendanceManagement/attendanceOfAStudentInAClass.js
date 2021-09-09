// Created by Prahalad
// controller for attendance management

const mongoose = require('mongoose');
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


  const session = await mongoose.startSession();

  // AttendanceOfAStudentInAClass.bulkWrite(
  //   req.body.members.map((member) => 
  //     ({
  //       updateOne: {
  //         filter: { studentId: member.id, classId: req.body.classId, activityId: req.body.activityId },
  //         update: { 
  //           $push: {
  //             records: [
  //               {
  //                 date: req.body.date,
  //                 attended: member.attended,
  //                 tardy: member.tardy,
  //                 comments: member.comments,
  //               }
  //             ]
  //           },
  //           $inc: { "attendedCount": member.attended &&  1, "tardyCount": member.tardy &&  1},
  //         },
  //         upsert: true
  //       }
  //     })
  //   ),
  //   (err, attendance) => {
  //           if (err) {
  //             return res.status(400).json({
  //                 err: "attendance updation failed",
  //             });
  //           }
    
  //           res.json(attendance);
  //       }
  // )


  // AttendanceOfAClassByMonth.bulkWrite(
  //   req.body.members.map((member) => 
  //     ({
  //       updateOne: {
  //         filter: { 
  //           month: req.body.month, 
  //           classId: req.body.classId, 
  //           // activityId: req.body.activityId, 
  //           "members.id": member.id
  //         },
  //         update: { 
  //           $inc:{
  //             "members.$.attendedCount": member.attended && 1, 
  //             "members.$.tardyCount": member.tardy && 1,
  //             // "classCount": 1 
  //           }
  //         },
  //         // upsert: true
  //       }
  //     })
  //   ),
  //   (err, attendance) => {
  //     if (err) {
  //       return res.status(400).json({
  //           err: "attendance updation failed",
  //       });
  //     }

  //     res.json(attendance);
  //   }
  // )
  


  var id = mongoose.Types.ObjectId()
    
  AttendanceOfAClassByDate.updateOne(
    { _id: id },
    { 
      $set: req.body,
    },
    { new: true, useFindAndModify: false, upsert: true },
    (err, attendance) => {
        if (err) {
          return res.status(400).json({
              err: "attendance updation failed",
          });
        }

        res.json(attendance);
    }
  );

    
}


