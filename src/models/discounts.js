const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const discountsSchema = new mongoose.Schema(
  {
    businessId: {
      type: ObjectId,
      ref: "Business",
    },
    discountSchemes: [
      {
        name: String,
        type: { type: String, enum: ["PERCENTAGE"], default: "PERCENTAGE" },
        value: Number,
        status: {
          type: String,
          enum: ["ACTIVE", "INACTIVE"],
          default: "ACTIVE",
        },
      },
    ],
    // updatedBy: {
    //   type: ObjectId,
    //   ref: "User",
    // },
    // createdBy: {
    //   type: ObjectId,
    //   ref: "User",
    // },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Discounts", discountsSchema);
// end
