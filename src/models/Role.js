const mongoose = require("mongoose");
const {
  FUNCTIONAL_PRIVILEDGES
} = require("../contants/constant");

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 32,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    functionalPriviledges: [
      {
        type: {
          type: String,
          enum: FUNCTIONAL_PRIVILEDGES,
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
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("Role", roleSchema);
