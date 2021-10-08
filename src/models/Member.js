const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const { ADDRESS_TYPE, RELATIONSHIPS } = require("../contants/constant");

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
    firstName: String,
    lastName: String,
    dob: Date,
    contacts: [
      {
        addressType: ADDRESS_TYPE,
        firstName: String,
        lastName: String,
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

module.exports = mongoose.model("Member", memberSchema);
