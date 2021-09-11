/**
 * queries
 * 1. get a class listing
 * 2. get a class detail
 * 2. update class detail
 */
module.exports.classes = {
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
<<<<<<< HEAD
      allergies: String,
      conditions: String,
=======
      allergies: [{}],
      conditions: [{}],
>>>>>>> origin/development
      startDate: Date,
      registeredDate: Date,
      enrolledStatus: ["REGISTERED", "DROPPED"],
      discontinuationReason: ["CLASS_TRANSFER", "DROPPED"],
      droppedDate: Date,
    },
  ],
  createdAt: Date,
  updatedAt: Date,
};
