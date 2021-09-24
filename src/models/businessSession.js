const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const businessSessionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    termId: {
      type: ObjectId,
      ref: "Term",
    },
    businessId: {
      type: ObjectId,
      ref: "Business",
    },
    pattern: [
      {
        day: {
          type: String,
          enum: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
        },
        starttime: Date,
        endtime: Date,
      },
    ],
    fullcapacity: {
      type: Number,
      default: 30,
    },
    fullcapacityfilled: {
      type: Number,
      default: 0,
    },
    waitcapacity: {
      type: Number,
      default: 10,
    },
    waitcapacityfilled: {
      type: Number,
      default: 0,
    },
    classId: {
      type: ObjectId,
      ref: "BusinessClass",
    },
    coachId: {
      type: ObjectId,
      ref: "User",
    },
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
module.exports = mongoose.model("BusinessSession", businessSessionSchema);
