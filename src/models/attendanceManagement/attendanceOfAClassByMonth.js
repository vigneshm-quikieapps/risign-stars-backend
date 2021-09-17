// Created by Prahalad.
// Schema for attendance.

const mongoose = require("mongoose");

const attendanceOfAClassByMonthSchema = new mongoose.Schema(
  {
    attendanceMonth: {
        type: Date,
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
    classCount: {
        type: Number,
        required: true,
        trim: true
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
            attendedCount: {
                type: Number,
                required: true,
                trim:true
            },
            
        },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("AttendanceOfAClassByMonth", attendanceOfAClassByMonthSchema);
// end
