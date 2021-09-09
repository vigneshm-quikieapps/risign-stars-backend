// created by prahalad
// controller for attendance

const AttendanceOfAClassByMonth = require("../../models/attendanceManagement/attendanceOfAClassByMonth")


//get all attendance of a class by month

exports.GetAllAttendanceOfAClassByMonth = async (req, res) => {
    try {
      const activity = await AttendanceOfAClassByMonth.find({});
  
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



//create attendance of a class by month

module.exports.createAttendanceOfAClassByMonth = async (req, res) => {
  try {
    //   console.log(req.body)
    const addNewStudent = new AttendanceOfAClassByMonth(req.body);
    await addNewStudent.save()
    res
      .status(201)
      .json({ success: true, message: "New student added.", result: addNewStudent });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}

//update attendance of a class by month

module.exports.addAttendanceOfAClassByMonth = async(req, res) => {
    
    AttendanceOfAClassByMonth.findOneAndUpdate(
      { 
        classId: req.body.classId, 
        month: req.body.month,
        "members.id": req.params.id
      },
      { 
        
        $inc: { "members.$.attendedCount": 1 , "members.$.tardyCount": 1 },
          // $inc: { "members.$.tardyCount": 1 }
        
        
      },
      { new: true, useFindAndModify: false },
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