const mongoose = require("mongoose");

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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Evaluation", evaluationSchema);
