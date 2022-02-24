const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const {
  ENUM_ENROLLED_STATUS,
  ENUM_DISCONTINUATION_REASON,
} = require("../constants/enrolment");
const mongoosePaginate = require("mongoose-paginate-v2");
const {
  ENUM_DISCOUNT_TYPES,
  TYPE_PERCENTAGE,
} = require("../constants/discount");

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
    name: String /** deprecated, will be removed, try not to use this */,
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
      /** mark the reason for discontinuation, if the enrolment status is 'DROPPED' */
      type: String,
      enum: ENUM_DISCONTINUATION_REASON,
    },
    transferedTo: {
      /** new enrolment id, if class transfer */
      type: ObjectId,
    },
    suspendedAt: {
      /** date on which the member went to suspended mode */
      type: Date,
    },
    returnFromSuspensionAt: {
      /** date on which the member return from suspension */
      type: Date,
    },
    discountDetail: {
      name: String,
      value: Number,
      type: {
        type: String,
        enum: ENUM_DISCOUNT_TYPES,
        default: TYPE_PERCENTAGE,
      },
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

  if (enrolment && enrolment.enrolledStatus != "DROPPED") {
    throw new Error(
      "member can enrol in only one session for a particular class"
    );
  }
};

enrolmentSchema.virtual("memberConsent", {
  ref: "MemberConsent",
  localField: "clubMembershipId",
  foreignField: "clubMembershipId",
  justOne: true,
});

enrolmentSchema.virtual("class", {
  ref: "BusinessClass",
  localField: "classId",
  foreignField: "_id",
  justOne: true,
});

enrolmentSchema.virtual("business", {
  ref: "Business",
  localField: "businessId",
  foreignField: "_id",
  justOne: true,
});

enrolmentSchema.virtual("session", {
  ref: "BusinessSession",
  localField: "sessionId",
  foreignField: "_id",
  justOne: true,
});

enrolmentSchema.virtual("member", {
  ref: "Member",
  localField: "memberId",
  foreignField: "_id",
  justOne: true,
});

// Ensure virtual fields are serialised.
enrolmentSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret.id;
  },
});

enrolmentSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Enrolment", enrolmentSchema);
