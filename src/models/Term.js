var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const termSchema = new mongoose.Schema(
  {
    business: {
      type: ObjectId,
      ref: "Business",
      required: true,
    },
    code: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      trim: true,
      required: true,
    },
    startdate: {
      type: Date,
      required: true,
    },
    enddate: {
      type: Date,
      required: true,
    },
    classsequence: {
      type: Number,
      required: true,
    },
    updatedBy: {
      type: String,
    },
    createdBy: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Term", termSchema);
