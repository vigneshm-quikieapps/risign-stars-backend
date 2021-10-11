const mongoose = require("mongoose");
const {
  ENUM_PAY_FREQUENCY,
  PAY_FREQUENCY_ANNUAL,
  ENUM_CHARGES,
  CHARGES_CLUB_MEMBERSHIP_ID,
} = require("../constants/businessFinance");
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
    charges: [
      {
        name: {
          type: String,
          enum: ENUM_CHARGES,
          default: CHARGES_CLUB_MEMBERSHIP_ID,
        },
        amount: {
          type: Number,
          required: true,
        },
        payFrequency: {
          type: String,
          enum: ENUM_PAY_FREQUENCY,
          default: PAY_FREQUENCY_ANNUAL,
        },
      },
    ],
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
module.exports = mongoose.model("BusinessFinance", businessFinanceSchema);
