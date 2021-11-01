// Created by Prahalad.
// Schema for attendance.

const mongoose = require("mongoose");
const { ObjectId } = require("mongoose").Schema;

/** attendance of a session for a particular date */
const attendanceOfAClassByDateSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
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
    records: [
      {
        memberId: {
          type: ObjectId,
          ref: "Member",
          required: true,
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
    createdBy: {
      type: ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

attendanceOfAClassByDateSchema.virtual("records.member", {
  ref: "Member",
  localField: "memberId",
  foreignField: "_id",
  justOne: true,
});

// Ensure virtual fields are serialised.
attendanceOfAClassByDateSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret.id;
  },
});

module.exports = mongoose.model(
  "AttendanceOfAClassByDate ",
  attendanceOfAClassByDateSchema
);
