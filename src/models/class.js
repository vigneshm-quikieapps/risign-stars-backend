const mongoose = require('mongoose')
const {
    ENUM_CLASSES_STATUS, ENUM_PAY_FREQUENCY
} = require("../contants/constant");


const classSchema = new mongoose.Schema(
  {
    id: String,
    platformId: String,
    name: String,
    businessId: String,
    status: ENUM_CLASSES_STATUS,
    registrationForm: [String],
    evaluationScheme: String,
    about: String,
    enrolmentControls: [
      {
        age:["6","7"],
        gender:["MALE","FEMALE"]
      }
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