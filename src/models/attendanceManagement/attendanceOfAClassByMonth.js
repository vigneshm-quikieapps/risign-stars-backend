// Created by Prahalad.
// Schema for attendance.

const mongoose = require("mongoose");
const { ObjectId } = require("mongoose").Schema;

/**
 * attendance of a session for a particular month
 */
const attendanceOfAClassByMonthSchema = new mongoose.Schema(
  {
    month: {
      type: Date,
      required: true,
      trim: true,
    } /** e.g 2021-09-01 in ISO format */,
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
    classCount: {
      type: Number,
      required: true,
      trim: true,
    } /** used to store total number of classes */,
    records: [
      {
        memberId: {
          type: ObjectId,
          ref: "Member",
          required: true,
          trim: true,
        },
        attendedCount: {
          type: Number,
          required: true,
          trim: true,
        },
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model(
  "AttendanceOfAClassByMonth",
  attendanceOfAClassByMonthSchema
);
// end
