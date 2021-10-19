// Created by Prahalad.
// Schema for attendance.

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const attendanceOfAClassByDateSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      trim: true,
    },
    sessionId: {
      type: String,
      required: true,
      trim: true,
    },
    classId: {
      type: String,
      required: true,
      trim: true,
    },
    className: {
      type: String,
      required: true,
      trim: true,
    },
    members: [
      {
        id: {
          type: ObjectId,
          ref: "Member",
          required: true,
        },
        memberConcentId: {
          type: ObjectId,
          ref: "MemberConsent",
          required: true,
        },
        name: {
          type: String,
          required: true,
          trim: true,
        },
        attended: {
          type: Boolean,
          required: true,
          trim: true,
        },
        comments: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model(
  "AttendanceOfAClassByDate ",
  attendanceOfAClassByDateSchema
);
// end
