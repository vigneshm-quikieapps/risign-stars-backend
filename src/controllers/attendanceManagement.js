// Created by Prahalad
// controller for attendance management

const mongoose = require('mongoose');
const { validationResult } = require("express-validator");
const AttendanceOfAStudentInAClass = require("../models/attendanceManagement/attendanceOfAStudentInAClass ")
const AttendanceOfAClassByDate = require("../models/attendanceManagement/attendanceOfAClassByDate")
const AttendanceOfAClassByMonth = require("../models/attendanceManagement/attendanceOfAClassByMonth")



//add attendance of a student in a class

module.exports.addAttendanceOfAStudentInAClass = async(req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array(),
    });
  }

  const session = await mongoose.startSession();

  session.startTransaction();

  try{

    await AttendanceOfAClassByDate.updateOne(
      { _id: mongoose.Types.ObjectId() },
      { 
        $set: {
          classId: req.body.classId,
          className:req.body.className,
          sessionId: req.body.sessionId,
          date: new Date(req.body.date),
          members: req.body.members
        },
      },
      { new: true, useFindAndModify: false, upsert: true },
    ).session(session)

    
    // updation

    await AttendanceOfAStudentInAClass.bulkWrite(
      req.body.members.map((member) => 
        ({
          updateOne: {
            filter: { studentId: member.id, classId: req.body.classId, sessionId: req.body.sessionId, attendanceMonth: req.body.attendanceMonth },
            update: { 
              $push: {
                records: [
                  {
                    date: new Date(req.body.date),
                    
                    attended: member.attended,
                    comments: member.comments,
                  }
                ]
              },
              $inc: { "attendedCount": member.attended &&  1},
            },
            upsert: true
          }
        })
      ),
      {session: session}
    )


    const monthAvaliability = await AttendanceOfAClassByMonth.findOne({date: new Date(req.body.date)}).session(session)

    if(!monthAvaliability){
      await AttendanceOfAClassByMonth.bulkWrite(
        req.body.members.map((member) => 
          ({
            updateOne: {
              filter: { 
                attendanceMonth: new Date(req.body.attendanceMonth),
                classId: req.body.classId,
                sessionId: req.body.sessionId,
                classCount: 1
              },
              update: { 
                $push: {
                  members: [
                    {
                      id: member.id,
                      name: member.name,
                      attendedCount: 0,
                      
                    }
                  ]
                },
                
              },
              upsert: true
            }
          })
        ),
        {session: session}
      )
    }

    await AttendanceOfAClassByMonth.bulkWrite(
      req.body.members.map((member) => 
        ({
          updateOne: {
            filter: { 
              attendanceMonth: new Date(req.body.attendanceMonth), 
              classId: req.body.classId,  
              sessionId: req.body.sessionId,
              "members.id": member.id
            },
            update: { 
              $inc:{
                "members.$.attendedCount": member.attended && 1, 
                
              }
            },
            // upsert: true
          }
        })
      ),
      {session: session}
    )

    
    await AttendanceOfAClassByMonth.updateOne(
      { attendanceMonth: new Date(req.body.attendanceMonth), classId: req.body.classId, sessionId: req.body.sessionId},
      {
        $inc: { "classCount": 1 }
      },
      { new: true, useFindAndModify: false }
    ).session(session)
    
    

    await session.commitTransaction();
        
    console.log('success');

    return res.status(201).send({ message: "updation successfull" });

  }catch(err){
    
    console.log('error');
    await session.abortTransaction();

    return res.status(422).send({ message: err.message });

  }finally{

    session.endSession();

  }
  
}


// get all the attendance of a class by date

module.exports.GetAllAttendanceByDate = async(req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array(),
    });
  }

  try {
    const attendance = await AttendanceOfAClassByDate.find(
      { 
        // date: req.body.date,
        date: new Date(req.body.date),
        classId: req.body.classId,
        sessionId: req.body.sessionId
      }
    );

    if (!attendance) {
      return res
        .status(200)
        .json({ success: true, message: "No attendance added." });
    } else {
      res.status(200).json({
        success: true,
        message: "Showing attendance of student in a class...",
        activity: attendance,
      });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}


// get all the attendance of a class by month

module.exports.GetAllAttendanceOfAClassByMonth = async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array(),
    });
  }

  try {

    const activity = await AttendanceOfAClassByMonth.aggregate([
      {
        $addFields: {month: {$month: {$toDate: "$attendanceMonth"}}, year: {$year : {$toDate : "$attendanceMonth"}}}
      },
      {$match: {month: req.body.attendancemonth, year: req.body.year, classId: req.body.classId, sessionId: req.body.sessionId}}
    ])

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


// get attendance of a student in a class by date

module.exports.GetAttendanceOfAStudentByDate = async(req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array(),
    });
  }

  try {
    const attendance = await AttendanceOfAClassByDate.findOne(
      { 
        // date: req.body.date,
        date: new Date(req.body.date),
        classId: req.body.classId,
        sessionId: req.body.sessionId,
      }
    ).select({ members: {$elemMatch: {id: req.body.id}}})
    

    if (!attendance) {
      return res
        .status(200)
        .json({ success: true, message: "No attendance added." });
    } else {
      res.status(200).json({
        success: true,
        message: "Showing attendance of student in a class...",
        activity: attendance,
      });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}

// get attendance of a student in a class by month

module.exports.GetAttendanceOfAStudentByMonth = async(req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array(),
    });
  }

  try {
    const attendance = await AttendanceOfAClassByMonth.aggregate([
      {$project : { 
        year: { $year: "$attendanceMonth" }, 
        month: { $month: "$attendanceMonth" },
        classId: "$classId",
        sessionId: "$sessionId",
        members: { 
          $filter: {
            input: "$members", 
            as: "member", 
            cond: { $eq: [ "$$member.id", req.body.id ] }
          }
        }
      }},
      {$match: {month: req.body.attendancemonth, year: req.body.year, classId: req.body.classId, sessionId: req.body.sessionId,}}
    ])

    if (!attendance) {
      return res
        .status(200)
        .json({ success: true, message: "No attendance added." });
    } else {
      res.status(200).json({
        success: true,
        message: "Showing attendance of student in a class...",
        activity: attendance,
      });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}


module.exports.test = async(req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array(),
    });
  }

  try {
    const attendance = await AttendanceOfAClassByMonth.updateOne(
      { attendanceMonth: new Date(req.body.attendanceMonth), classId: req.body.classId, sessionId: req.body.sessionId},
      {
        $inc: { "classCount": 1 }
      },
      { new: true, useFindAndModify: false }
    )

    if (!attendance) {
      return res
        .status(200)
        .json({ success: true, message: "No attendance added." });
    } else {
      res.status(200).json({
        success: true,
        message: "Showing attendance of student in a class...",
        activity: attendance,
      });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}