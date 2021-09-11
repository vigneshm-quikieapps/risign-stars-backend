const mongoose = require('mongoose')
const {
    ENUM_CLASSES_STATUS, ENUM_PAY_FREQUENCY
} = require("../contants/constant");


const classSchema = new mongoose.Schema(
  {
     
    platformId: String,
    name: String,
    businessId: String,
    status: ENUM_CLASSES_STATUS,
    registrationForm: [String],
    evaluationScheme: String,
    about: String,
    enrolmentControls: [
      {
        type: Array,
        name: "age",
        enum:
          ["7","8"] 
      },
      {
        type: Array,
        name: "gender",
        enum: [
          "MALE",
          "FEMALE",
        ] 
      },
    ],
    classes: [
     
    ],
    charges: [
      {
        name: String,
        amount: String,
        mandatory: Boolean,
        payFrequency: ENUM_PAY_FREQUENCY,
      },
    ],
    createdAt: Date,
    updatedAt: Date,
  },
  { timestamps: true }
)
  module.exports = mongoose.model("class", classSchema)