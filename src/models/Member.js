const mongoose = require('mongoose')
const {
  ADDRESS_TYPE,
  RELATIONSHIPS
} = require("../contants/constant");

const memberSchema = new mongoose.Schema(
  

  {
    id: String,
    platformId:
      String /** should be a auto increment unique numeric serial ids */,
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
    updatedBy: [String],
    createdAt: Date,
    updatedAt: Date,
  },
  { timestamps: true }
)

module.exports = mongoose.model("Member", memberSchema)