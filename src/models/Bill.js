const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");
const {
  ENUM_STATUS,
  STATUS_ACTIVE,
  ENUM_TRANSACTION_TYPES,
} = require("../constants/bill");

const billSchema = new mongoose.Schema(
  {
    memberId: {
      type: ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: ENUM_STATUS,
      default: STATUS_ACTIVE,
    },
    classId: {
      type: ObjectId,
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
          type: Number,
          required: true,
        },
        startDate: Date,
        endDate: Date,
      },
    ],
    partialTransactions: [
      {
        amount: {
          type: Number,
        },
        paidAt: {
          type: Date,
        },
        transactionType: {
          type: String,
          enum: ENUM_TRANSACTION_TYPES,
        },
        method: {
          type: String,
        },
        reference: {
          type: String,
        },
        updateMethod: {
          type: String,
        },
        processDate: {
          type: Date,
        },
        batchProcessId: {
          type: String,
        },
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
    termId:{
      type: ObjectId,
    },
    enrolmentId:{
      type: ObjectId,
    },
    billDate: {
      /**
       * bill date is used to store the month, year info of the bill
       * (indicates which particular month this bill belongs to)
       */
      type: Date,
      required: true,
    },
    generatedAt: {
      /** generated date is used to store the month, year info of the bill (when its generated) */
      type: Date,
      required: true,
    },
    transactionType: {
      type: String,
      enum: ENUM_TRANSACTION_TYPES,
    },
    reference: {
      type: String,
    },
    method: {
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

billSchema.virtual("member", {
  ref: "Member",
  localField: "memberId",
  foreignField: "_id",
  justOne: true,
});

billSchema.virtual("paid").get(function () {
  return this.paidAt ? true : false;
});

// Ensure virtual fields are serialised.
billSchema.set("toJSON", {
  virtuals: true,
});

billSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Bill", billSchema);
