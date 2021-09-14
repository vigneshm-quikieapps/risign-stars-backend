const mongoose = require("mongoose");
const registrationSchema = new mongoose.Schema(
{
    id: String,
    pattern: [
      {
        day: String,
        startTime: Date,
        endTime: Date,
      },
    ],
    classCapacity: Number,
    waitlistCapacity: Number,
    waitlistEnrolled: Number,
    facility: String,
    coach: {
      id: String,
      name: String,
    },
    members: [
      {
        name: String,
        allergies: String,
        conditions: String,
        startDate: Date,
        registeredDate: Date,
        enrolledStatus: ["REGISTERED", "DROPPED"],
        discontinuationReason: ["CLASS_TRANSFER", "DROPPED"],
        droppedDate: Date,
      },
    ],
    createdAt: Date,
    updatedAt: Date,
  },
  { timestamps: true }
  );
  
  module.exports = mongoose.model("Registration", registrationSchema);