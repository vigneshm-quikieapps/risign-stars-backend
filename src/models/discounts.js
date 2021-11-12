const mongoose = require("mongoose");
const {
  ENUM_DISCOUNT_TYPES,
  TYPE_PERCENTAGE,
  ENUM_STATUS,
  ACTIVE_STATUS,
} = require("../constants/discount");
const { ObjectId } = mongoose.Schema;

const discountsSchema = new mongoose.Schema(
  {
    businessId: {
      type: ObjectId,
      ref: "Business",
    },
    name: String,
    type: {
      type: String,
      enum: ENUM_DISCOUNT_TYPES,
      default: TYPE_PERCENTAGE,
    },
    value: Number,
    status: {
      type: String,
      enum: ENUM_STATUS,
      default: ACTIVE_STATUS,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      select: false,
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
module.exports = mongoose.model("Discounts", discountsSchema);
// end
