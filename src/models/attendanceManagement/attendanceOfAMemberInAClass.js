// Created by Prahalad.
// Schema for attendance.

const mongoose = require("mongoose");
const { ObjectId } = require("mongoose").Schema;

/**
 * attendance of a member in a session (for each month)
 */
const attendanceOfAMemberInAClassSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      trim: true,
    },
    memberId: {
      type: ObjectId,
      ref: "Member",
      required: true,
      trim: true,
    },
    sessionId: {
      type: ObjectId,
      ref: "BusinessSession",
      required: true,
      trim: true,
    },
    classId: {
      type: ObjectId,
      ref: "BusinessClass",
      required: true,
      trim: true,
    },
    month: {
      type: Date, // type - Date
      required: true,
      trim: true,
    } /** starting of a month */ /** end of a month */,
    records: [
      {
        date: {
          type: Date,
          required: true,
          trim: true,
        },
        attended: {
          type: Boolean,
          required: true,
          trim: true,
        },
      },
    ],
    attendedCount: {
      type: Number,
      required: true,
      trim: true,
    },
    createdBy: {
      _id: ObjectId,
      name: String,
    },
    updatedBy: {
      _id: ObjectId,
      name: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model(
  "AttendanceOfAMemberInAClass",
  attendanceOfAMemberInAClassSchema
);
