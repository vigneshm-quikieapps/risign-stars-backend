const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const evaluationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "inactive"],
    },
    levelcount: {
      type: Number,
      required: true,
    },
    levels: [
      {
        skills: [],
      },
    ],
    updatedBy:  {
       type: ObjectId,
            ref:"User"
    },
    createdBy: {
       type: ObjectId,
            ref:"User"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Evaluation", evaluationSchema);
