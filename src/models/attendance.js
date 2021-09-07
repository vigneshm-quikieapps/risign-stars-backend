// Created by Prahalad.
// Schema for attendance.

const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    activity_name: {
      type: String,
      required: true,
      trim: true,
    },
    class_id: {
        type: String,
        required: true,
        trim: true,
    },
    start_time: {
      type: String,
      required: true,
      trim: true,
    },
    end_time: {
      type: String,
      required: true,
      trim: true,
    },
    coach: {
      type: String,
      required: true,
      trim: true,
    },
    info: [
      {
        date: {
          type: String,
          required: true,
          trim: true,
        },
        members: [
          {
            name: {
              type: String,
              required: true,
              trim: true,
            },
            status: {
              attended: {
                type: Boolean,
                default: false,
              },
              no_show: {
                type: Boolean,
                default: false,
              },
              tardy: {
                type: Boolean,
                default: false,
              },
            },
          }
        ]
      }
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Attendance", attendanceSchema);
// end
