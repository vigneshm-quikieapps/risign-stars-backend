var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");
const { IN_PROGRESS } = require("../constants/constant");

const xlsxSchema = new mongoose.Schema(
  {
    xlsxUrl: {
      type: String,
      required: true,
    },
    batchProcessId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: IN_PROGRESS,
    },
    uploadPaymentList: [
      {
        memberName: {
          type: String,
        },
        membershipNumber: {
          type: String,
        },
        amount: {
          type: Number,
        },
        type: {
          type: String,
        },
        paymentMethod: {
          type: String,
        },
        uploadStatus: {
          type: String,
          required: true,
        },
        noDataFound: {
          type: String,
        },
        amountError: {
          type: String,
        },
        errorsInData: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

xlsxSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Xlsx", xlsxSchema);
