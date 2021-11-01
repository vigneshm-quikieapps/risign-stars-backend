const addAttendance = require("./addAttendance");
const getAttendanceOfAClassByDate = require("./getAttendanceOfAClassByDate");
const getAttendanceOfAClassByMonth = require("./getAttendanceOfAClassByMonth");
const getAttendanceOfASessionByDate = require("./getAttandanceOfASessionByDate");
const getAttendanceOfASessionByMonth = require("./getAttandanceOfASessionByMonth");
const getAttendanceOfAMemberInAClassByDate = require("./getAttendanceOfAMemberInAClassByDate");
const getAttendanceOfAMemberInAClassByMonth = require("./getAttendanceOfAMemberInAClassByMonth");
const getAttendanceOfAMemberInASession = require("./getAttendanceOfAMemberInASession");
const getAttendanceOfAMemberInASessionByDate = require("./getAttendanceOfAMemberInASessionByDate");
const getAttendanceOfAMemberInASessionByMonth = require("./getAttendanceOfAMemberInASessionByMonth");

/**
 * attendance Management controller
 */
module.exports = {
  addAttendance,
  getAttendanceOfAClassByDate,
  getAttendanceOfAClassByMonth,
  getAttendanceOfASessionByDate,
  getAttendanceOfASessionByMonth,
  getAttendanceOfAMemberInAClassByDate,
  getAttendanceOfAMemberInAClassByMonth,
  getAttendanceOfAMemberInASession,
  getAttendanceOfAMemberInASessionByDate,
  getAttendanceOfAMemberInASessionByMonth,
};

// module.exports.test = async (req, res) => {
//   try {
//     const attendance = await AttendanceOfAClassByMonth.updateOne(
//       {
//         attendanceMonth: new Date(req.body.attendanceMonth),
//         classId: req.body.classId,
//         sessionId: req.body.sessionId,
//       },
//       {
//         $inc: { classCount: 1 },
//       },
//       { new: true, useFindAndModify: false }
//     );

//     if (!attendance) {
//       return res
//         .status(200)
//         .json({ success: true, message: "No attendance added." });
//     } else {
//       res.status(200).json({
//         success: true,
//         message: "Showing attendance of student in a class...",
//         activity: attendance,
//       });
//     }
//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// };

// let data = [
//   {
//     _id: ObjectId("617ec7a73190d3de159a68e5"),
//     classId: ObjectId("614b0929c265630cd54594af"),
//     memberId: ObjectId("614b2d19c265630cd564c37c"),
//     month: ISODate("2021-11-01T00:00:00.000Z"),
//     sessionId: ObjectId("614b1bd6c265630cd5511205"),
//     attendedCount: 2,
//     createdAt: ISODate("2021-10-31T16:43:19.749Z"),
//     records: [
//       {
//         date: ISODate("2021-11-03T00:00:00.000Z"),
//         attended: true,
//         _id: ObjectId("617ec7a73190d3de159a68e6"),
//       },
//       {
//         date: ISODate("2021-11-10T00:00:00.000Z"),
//         attended: true,
//         _id: ObjectId("617ec7d53190d3de159a68ff"),
//       },
//     ],
//     updatedAt: ISODate("2021-10-31T16:44:05.406Z"),
//   },
//   {
//     _id: ObjectId("617ece2438e660090fd5c350"),
//     classId: ObjectId("614b0929c265630cd54594af"),
//     memberId: ObjectId("614b2d19c265630cd564c37c"),
//     month: ISODate("2021-12-01T00:00:00.000Z"),
//     sessionId: ObjectId("614b1bd6c265630cd5511205"),
//     attendedCount: 0,
//     createdAt: ISODate("2021-10-31T17:11:00.830Z"),
//     records: [
//       {
//         date: ISODate("2021-12-01T00:00:00.000Z"),
//         attended: false,
//         _id: ObjectId("617ece2438e660090fd5c351"),
//       },
//     ],
//     updatedAt: ISODate("2021-10-31T17:11:00.830Z"),
//   },
// ];
