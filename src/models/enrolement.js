const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const {
  ENUM_ENROLLED_STATUS,
  ENUM_DISCONTINUATION_REASON,
} = require("../contants/constant");

const enrolementSchema = new mongoose.Schema(
  {
   memberName:String,
    memberId: {
      type: ObjectId,
    },
    sessionId: {
       type: ObjectId,
       ref: "BusinessSession"
    },
    classId:{
   type: ObjectId,
       ref: "BusinessClass"
    },
    businessId: {
     type: ObjectId,
       ref: "Business"
    },
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
    discontinuationReason: {
      type:String,
      enum:["CLASS_TRANSFER", "CANCELLED"]
    },
    droppedDate: Date,
    
    updatedBy:  {
       type: ObjectId,
            ref:"User"
    },
    createdBy: {
       type: ObjectId,
            ref:"User"
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Enrolement", enrolementSchema)