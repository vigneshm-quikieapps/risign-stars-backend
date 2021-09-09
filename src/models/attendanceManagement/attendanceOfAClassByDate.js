// Created by Prahalad.
// Schema for attendance.

const mongoose = require("mongoose");

const attendanceOfAClassByDateSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
      trim:true
    },
    sessionId: {
      type: String,
      required: true,
      trim:true
    },
    classId: {
      type: String,
      required: true,
      trim:true
    },
    className: {
      type: String,
      required: true,
      trim:true
    },
    members: [
      {
        id: {
          type: String,
          required: true,
          trim:true
        },
        name: {
          type: String,
          required: true,
          trim:true
        },
        attended: {
          type: Boolean,
          required: true,
          trim:true
        },
        tardy: {
          type: Boolean,
          required: true,
          trim:true
        },
        comments: {
          type: String,
          required: true,
          trim:true
        },
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("AttendanceOfAClassByDate ", attendanceOfAClassByDateSchema);
// end
