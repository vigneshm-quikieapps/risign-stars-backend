// created by prahalad
// controller for attendance

const AttendanceOfAClassByDate = require("../../models/attendanceManagement/attendanceOfAClassByDate")


//get all attendance of a class by date

exports.GetAllAttendanceOfAClassByDate = async (req, res) => {
    try {
      const activity = await AttendanceOfAClassByDate.find({});
  
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



//create attendance of a class by date

module.exports.createAttendanceOfAClassByDate = async (req, res) => {
  try {
    //   console.log(req.body)
    const addNewStudent = new AttendanceOfAClassByDate(req.body);
    await addNewStudent.save()
    res
      .status(201)
      .json({ success: true, message: "New student added.", product: addNewStudent });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}

//update attendance of a class by date

// module.exports.addAttendanceOfAClassByDate = async(req, res) => {
    
//     AttendanceOfAClassByDate.findByIdAndUpdate(
//         { _id: req.params.id },
//         { 
//             $push: {
//                 records: [
//                     {
//                         date: req.body.date,
//                         attended: req.body.attended,
//                         tardy: req.body.tardy,
//                         comments: req.body.comments,
//                     }
//                 ]
//             },
//             $inc: req.body.attended && { "attendedCount": 1 },
//             $inc: req.body.tardyCount && { "tardyCount": 1 }
//         },
//         { new: true, useFindAndModify: false },
//         (err, attendance) => {
//             if (err) {
//                 return res.status(400).json({
//                     err: "attendance updation failed",
//                 });
//             }
    
//             res.json(attendance);
//         }
//     );
    
// }