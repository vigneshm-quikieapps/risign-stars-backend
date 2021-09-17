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
    memberId: String,
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
    enrolledStatus: {
      type: String,
      enum: ENUM_ENROLLED_STATUS
    },
    discontinuationReason: {
      type: String, 
      enum: ENUM_DISCONTINUATION_REASON
    },
    droppedDate: Date,
  },
{ timestamps: true }
)

module.exports = mongoose.model("Enrolement", enrolementSchema)