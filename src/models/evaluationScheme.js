const mongoose = require("mongoose");
const {
  EVALUATION_STATUS,
  EVALUATION_STATUS_ACTIVE,
} = require("../constants/constant");
const { ObjectId } = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

const evaluationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      default: EVALUATION_STATUS_ACTIVE,
      enum: EVALUATION_STATUS,
    },
    levelCount: {
      type: Number,
      required: true,
    },
    levels: [
      {
        skills: [],
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

evaluationSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("EvaluationScheme", evaluationSchema);
