const mongoose = require("mongoose");

const FUNCTIONAL_PRIVILEDGES = [
  "ACTIVITY_DEFINITION",
  "ACTIVITY_ENROLMENT",
  "ACTIVITY_ATTENDANCE"
];

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 32,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    functionalPriviledges: [
      {
        type: {
          type: String,
          enum: FUNCTIONAL_PRIVILEDGES,
          required: true
        },
        permission: {
          create: Boolean,
          read: Boolean,
          update: Boolean,
          delete: Boolean
        }
      }
    ],
    dataPriviledges: {
      type: {
        type: String,
        enum: ["ALL", "ONE"],
        required: true
      },
      businessId: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Role", roleSchema);
