// Created by Prahalad
// controller for attendance management

const Attendance = require("../models/attendance")

//

exports.GetAllActivity = async (req, res) => {
    try {
      const activity = await Attendance.find({});
  
      if (!activity) {
        return res
          .status(200)
          .json({ success: true, message: "No activity added." });
      } else {
        res.status(200).json({
          success: true,
          message: "Showing activity...",
          activity: activity,
        });
      }
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
};

//create business

module.exports.createActiivty = async (req, res) => {
  try {
      console.log(req.body)
    const newActivity = new Attendance(req.body);
    await newActivity.save()
    res
      .status(201)
      .json({ success: true, message: "Activity added.", product: newActivity });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}

// module.exports.addAttendance = async(req, res) => {
    
//     Attendance.findByIdAndUpdate(
//         { _id: req.params.id },
//         { $set: req.body },
//         { new: true, useFindAndModify: false },
//         (err, attendance) => {
//             if (err) {
//             return res.status(400).json({
//                 err: "updation failed ",
//             });
//             }
    
//             res.json(attendance);
//         }
//     );
    
// }

module.exports.addAttendance = async(req, res) => {
    
    Attendance.findByIdAndUpdate(
        { _id: req.params.id },
        { 
            $push: {
                info: [
                    {
                        date: req.body.date,
                        members: req.body.members
                    }
                ]
            } 
        },
        { new: true, useFindAndModify: false },
        (err, attendance) => {
            if (err) {
            return res.status(400).json({
                err: "updation failed ",
            });
            }
    
            res.json(attendance);
        }
    );
    
}


module.exports.updateAttendance = async(req, res) => {
    console.log(req.params.id)
    Attendance.findOneAndUpdate(
        // { _id: req.params.id },
        {   
            _id: req.params.id,
            info: {
                $elemMatch: {
                    date: req.body.date, 
                }
            }
        },
        { 
            $push: {
                "info.$.members": [
                    {
                        name: req.body.name,
                        status: {
                            attended: req.body.attended,
                            no_show: req.body.no_show,
                            tardy: req.body.tardy,
                        },
                    }
                ]
            } 
        },
        // { new: true, useFindAndModify: false },
        (err, attendance) => {
            if (err) {
            return res.status(400).json({
                err: "updation failed ",
            });
            }
    
            res.json(attendance);
        }
    );
    
}

// module.exports.updateAttendance = async (req, res) => {
//     try {
//       let { roleId } = req.params;
//       let options = { new: true };
//       let role = await Role.findByIdAndUpdate(roleId, req.body, options);
//       if (!role) {
//         throw new DoesNotExistException();
//       }
//       return res.send({ message: "updated successfully", role });
//     } catch (err) {
//       console.error(err);
//       return res.status(422).send({ message: err.message });
//     }
// };

// module.exports.createAttendance = (req, res) => {
//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     return res.status(422).json({
//       error: errors.array()[0].msg,
//     });
//   }
//   const business = new Business(req.body);
//   business.save((err, business) => {
//     if (err) {
//       return res.status(400).json({
//         error: "unable to save evaluation to database",
//       });
//     }
//     res.json(business);
//   });
// };

