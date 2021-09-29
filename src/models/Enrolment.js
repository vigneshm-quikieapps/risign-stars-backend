const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const {
  ENUM_ENROLLED_STATUS,
  ENUM_DISCONTINUATION_REASON,
} = require("../contants/constant");

const enrolmentSchema = new mongoose.Schema(
  {
    //  memberName:String,
    memberId: {
      type: ObjectId,
    },
    sessionId: {
      type: ObjectId,
      ref: "BusinessSession",
    },
    classId: {
      type: ObjectId,
      ref: "BusinessClass",
    },
    businessId: {
      type: ObjectId,
      ref: "Business",
    },
    name: String,
    // memberId: String,
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
      enum: ENUM_ENROLLED_STATUS,
    },
    discontinuationReason: {
      type: String,
      enum: ENUM_DISCONTINUATION_REASON,
    },
    transferedTo: {
      type: ObjectId,
      /** new enrolment id, if class transfer */
    },
    droppedDate: Date,
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

enrolmentSchema.statics.canEnrol = async function (filter) {
  let enrolment = await this.findOne(filter);

  if (enrolment) {
    throw new Error(
      "member can enrol in only one session for a particular class"
    );
  }
};

module.exports = mongoose.model("Enrolment", enrolmentSchema);
