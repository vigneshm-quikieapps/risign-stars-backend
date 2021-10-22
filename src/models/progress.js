const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const { SKILL_PROGRESS_STATUS } = require("../constants/constant");

const progressSchema = new mongoose.Schema(
  {
    memberId: {
      type: ObjectId,
      required: true,
    },
    clubMembershipId: {
      type: String,
      required: true,
    },
    evaluationSchemeId: {
      type: ObjectId,
      required: true,
    },
    businessId: {
      type: ObjectId,
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
