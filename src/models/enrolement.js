const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const {
  ENUM_ENROLLED_STATUS,
  ENUM_DISCONTINUATION_REASON,
} = require("../contants/constant");

const enrolementSchema = new mongoose.Schema(
  {
    // name: String,
    
    // sessionId: String,
    // student Id:should link it here
    sessionId: {
    name: String,

      // type: ObjectId,
      // ref: "BusinessSession"
    },
    classId:{
    name: String,

      // type: ObjectId,
      // ref: "BusinessClass"
    },
    businessId: {
    name: String,

      // type: ObjectId,
      // ref: "Business"
    },
    // name: String,
    // clubMembershipId: String,
    // consent: {
    //   allergies: String,
    //   condition: String,
    //   photographConsent: Boolean,
    //   signedByParent: Boolean,
    //   signedAt: Date,
    // },
    // newsletter: {
    //   email: Boolean,
    //   telephone: Boolean,
    //   sms: Boolean,
    // },
    // startDate: Date,
    // registeredDate: Date,
    enrolledStatus: ENUM_ENROLLED_STATUS,
    discontinuationReason: {
      type:String,
      enum:["CLASS_TRANSFER", "CANCELLED"]
    },
    droppedDate: Date,
 
  },
  { timestamps: true }
)

module.exports = mongoose.model("Enrolement", enrolementSchema)