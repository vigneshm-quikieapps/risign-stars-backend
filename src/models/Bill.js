const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

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
    clubMembershipId: {
      type: String,
      required: true,
    },
    businessId: {
      type: ObjectId,
      required: true,
    },
    items: [
      {
        chargeId: ObjectId,
        name: {
          type: String,
          required: true,
        },
        description: String,
        amount: {
          type: String,
          required: true,
        },
        startDate: Date,
        endDate: Date,
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
    },
    comments: {
      type: String,
    },
    billDate: {
      /** bill date is used to store the month, year info of the bill */
      type: Date,
      required: true,
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

billSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
billSchema.set("toJSON", {
  virtuals: true,
});

billSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Bill", billSchema);
