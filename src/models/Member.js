const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const { ADDRESS_TYPE, RELATIONSHIPS } = require("../constants/member");
const mongoosePaginate = require("mongoose-paginate-v2");
const { ENUM_GENDER } = require("../constants/user");

const memberSchema = new mongoose.Schema(
  {
    id: String,
    userId: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    membership: [
      {
        businessId: ObjectId,
        clubMembershipId: String,
      },
    ],
    fullName: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ENUM_GENDER,
      required: true,
    },
    contacts: [
      {
        addressType: {
          type: String,
          enum: ADDRESS_TYPE,
        },
        fullName: String,
        contact: String,
        relationship: {
          type: String,
          enum: RELATIONSHIPS,
        },
      },
    ],
    imageUrl: String,
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
memberSchema.virtual("parent", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
});
// Ensure virtual fields are serialised.
memberSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret.id;
  },
});

memberSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Member", memberSchema);
