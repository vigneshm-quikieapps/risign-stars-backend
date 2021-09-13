const mongoose = require('mongoose');
const {
  ENUM_ENROLLED_STATUS,
  ENUM_DISCONTINUATION_REASON,
} = require("../contants/constant");

const enrolementSchema = new mongoose.Schema(
  {
    id: String,
    sessionId: String,
    classId: String,
    businessId: String,
    name: String,
    clubMembershipId: String,
    consent: {
      allergies: String,
      condition: String,
      photographConsent: Boolean,
      signedByParent: Boolean,
      signedAt: Date,
    },
    newsletter: {
      email: Boolean,
      telephone: Boolean,
      sms: Boolean,
    },
    startDate: Date,
    registeredDate: Date,
      enrolledStatus: ENUM_ENROLLED_STATUS,
      discontinuationReason: ENUM_DISCONTINUATION_REASON,
    droppedDate: Date,
    createdAt: Date,
    updatedAt: Date,
  },
{ timestamps: true }
)

module.exports = mongoose.model("Enrolement", enrolementSchema)