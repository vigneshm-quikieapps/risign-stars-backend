const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const billSchema = new mongoose.Schema(
  {
    memberId: {
      type: ObjectId,
      required: true,
    },
    classId: {
      type: ObjectId,
      required: true,
    },
    businessId: {
      type: ObjectId,
      required: true,
    },
    items: [
      {
        description: String,
        amount: Number,
      },
    ],
    subtotal: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    paidAt: {
      type: Date,
      required: true,
    },
    comments: {
      type: String,
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
module.exports = mongoose.model("Bill", billSchema);
