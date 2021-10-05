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
    discountSchemesId: {
      type: ObjectId,
      ref: "Discounts",
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
module.exports = mongoose.model("BusinessFinance", businessFinanceSchema);
// end
