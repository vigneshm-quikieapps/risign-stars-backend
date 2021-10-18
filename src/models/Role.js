const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const { FUNCTIONAL_PRIVILEGES } = require("../constants/constant");
const mongoosePaginate = require("mongoose-paginate-v2");

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 32,
      required: true,
      unique: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    functionalPrivileges: [
      {
        type: {
          type: String,
          enum: FUNCTIONAL_PRIVILEGES,
          required: true,
        },
        permission: {
          create: {
            type: Boolean,
            default: false,
          },
          read: {
            type: Boolean,
            default: false,
          },
          update: {
            type: Boolean,
            default: false,
          },
          delete: {
            type: Boolean,
            default: false,
          },
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

roleSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Role", roleSchema);
