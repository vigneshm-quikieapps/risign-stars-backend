const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const memberConsentSchema = new mongoose.Schema(
  {
    businessId: {
      type: ObjectId,
      ref: "Business",
      required: true,
    },
    memberId: {
      type: ObjectId,
      ref: "Member",
      required: true,
    },
    clubMembershipId: {
      type: String,
      required: true,
    },
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

memberConsentSchema.index({ clubMembershipId: 1 });

module.exports = mongoose.model("MemberConsent", memberConsentSchema);
