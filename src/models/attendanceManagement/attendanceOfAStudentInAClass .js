// Created by Prahalad.
// Schema for attendance.

const mongoose = require("mongoose");

const attendanceOfAStudentInAClassSchema = new mongoose.Schema(
  {
    id: {
        type: String,
        required: true,
        trim:true
    },
    membersId: {
        type: String,
        required: true,
        trim:true
    },
    sessionId:{
        type: String,
        required: true,
        trim:true
    },
    classId:{
        type: String,
        required: true,
        trim:true
    },
    startDate: {
        type: String,        // type - Date
        required: true,
        trim:true
    },                          /** starting of a month */
    endDate: {
        type: String,           // type - Date
        required: true,
        trim:true
    },                          /** end of a month */
    records: [
        {
            date: {
                type: Date,
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
    attendedCount: {
        type: Number,
        required: true,
        trim:true
    },
    tardyCount: {
        type: Number,
        required: true,
        trim:true
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("AttendanceOfAStudentInAClass", attendanceOfAStudentInAClassSchema);