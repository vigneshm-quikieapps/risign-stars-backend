const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const businessFinanceSchema = new mongoose.Schema(
  {
    businessId: {
      type: ObjectId,
      ref: "Business",
    },
    bankDetails: {
      accHolderName: String,
      bankName: String,
      sortCode: String,
      accNo: Number,
    },
    paymentMethod: {
      online: Boolean,
      manual: Boolean,
    },
    discountSchemes: [
      {
        name: String,
        type: { type: String, enum: ["PERCENTAGE"], default: "PERCENTAGE" },
        value: Number,
      },
    ],
    updatedBy: {
      type: String,
      ref: "User",
    },
    createdBy: {
      type: String,
      ref: "User",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("BusinessFinance", businessFinanceSchema);
// end
