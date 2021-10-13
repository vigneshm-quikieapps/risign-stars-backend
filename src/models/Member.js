const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const { ADDRESS_TYPE, RELATIONSHIPS } = require("../constants/constant");
const mongoosePaginate = require("mongoose-paginate-v2");

const memberSchema = new mongoose.Schema(
  {
    id: String,
    userId: String,
    membership: [
      {
        businessId: String,
        clubMembershipId: String,
      },
    ],
    fullName: String,
    dob: Date,
    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHER"],
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

memberSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Member", memberSchema);
