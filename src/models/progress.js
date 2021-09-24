const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const { SKILL_PROGRESS_STATUS } = require("../contants/constant");

const progressSchema = new mongoose.Schema(
  {
    enrolmentId: {
      type: ObjectId,
    },
    memberId: {
      type: String,
      required: true,
    },
    sessionId: {
      type: String,
      required: true,
    },
    classId: {
      type: String,
      required: true,
    },
    businessId: {
      type: String,
      required: true,
    },
    levelCount: {
      type: Number,
      required: true,
    },
    levels: [
      {
        skills: [
          {
            name: {
              type: String,
              required: true,
            },
            status: {
              type: String,
              required: true,
              enum: SKILL_PROGRESS_STATUS,
            },
            startedAt: Date /** when the skill is marked as inProgress */,
            completedAt: Date /** when the shill is marked as attained */,
          },
        ],
        status: {
          type: String,
          required: true,
          enum: SKILL_PROGRESS_STATUS,
        },
      },
    ],
    updatedBy: {
      type: ObjectId,
      ref: "User",
    },
    createdBy: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Progress", progressSchema);
