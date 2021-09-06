const ENROLLED_STATUS = ["REGISTERED", "DROPPED"];
const DISCONTINUATION_REASON = ["CLASS_TRANSFER", "CANCELLED"];
const DAY = ["MON", "TUE", "WEB", "THU", "FRI", "SAT"];

/**
 * get details of a class
 * update details of a class
 * get class listing
 */
module.exports.classes = {
  id: String,
  activityId: String,
  activityName: String,
  pattern: [
    {
      day: DAY,
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
};

/**
 * API's
 * 1. CRU members of a class
 * 2. change class (class transfer) of member in a class/activity
 * 3. cancel membership from a class
 *
 * Notes:
 * 2a. when a class transfer occurs. mark the current record as dropped.
 * 2b. mark the discontinuationReason to CLASS_TRANSFER.
 *
 */
module.exports.classMembers = {
  id: String,
  classId: String,
  activityId: String,
  name: String,
  allergies: String,
  conditions: String,
  startDate: Date,
  registeredDate: Date,
  enrolledStatus: ENROLLED_STATUS,
  discontinuationReason: DISCONTINUATION_REASON,
  droppedDate: Date,
  createdAt: Date,
  updatedAt: Date,
};
