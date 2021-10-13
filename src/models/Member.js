const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const { ADDRESS_TYPE, RELATIONSHIPS } = require("../constants/constant");
const mongoosePaginate = require("mongoose-paginate-v2");

const memberSchema = new mongoose.Schema(
  {
    id: String,
    userId: {
      type: ObjectId,
      required: true,
    },
    membership: [
      {
        businessId: String,
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
      enum: ["MALE", "FEMALE", "OTHER"],
      required: true,
    },
    contacts: [
      {
        addressType: ADDRESS_TYPE,
        fullName: String,
        contact: String,
        relationShip: RELATIONSHIPS,
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
