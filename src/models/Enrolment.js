const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const {
  ENUM_ENROLLED_STATUS,
  ENUM_DISCONTINUATION_REASON,
} = require("../constants/enrolment");

const enrolmentSchema = new mongoose.Schema(
  {
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
    clubMembershipId: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
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
