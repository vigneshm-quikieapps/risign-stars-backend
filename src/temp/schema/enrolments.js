const {
  ENUM_ENROLLED_STATUS,
  ENUM_DISCONTINUATION_REASON,
} = require("./constants");

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
module.exports.enrolments = {
  id: String,
  sessionId: String,
  classId: String,
  businessId: String,
  memberId: String,
  name: String /** Name of member */,
  clubMembershipId: String,
  startDate: Date,
  registeredDate: Date,
  enrolledStatus: ENUM_ENROLLED_STATUS,
  discontinuationReason: ENUM_DISCONTINUATION_REASON,
  droppedDate: Date,
  createdAt: Date,
  createdBy: String /** userId */,
  lastUpdatedAt: Date,
  lastUpdatedBy: String /** userId */,
};
