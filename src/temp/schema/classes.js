const { ENUM_CLASSES_STATUS, ENUM_PAY_FREQUENCY } = require("./constants");

/**
 * API's
 * 1. get a list of activity
 * 2. CRUD activity
 * 3. get charges/fees of an activity
 * 4.
 * 5.
 */
module.exports.classes = {
  _id: String,
  platformId: String,
  name: String,
  businessId: String,
  status: ENUM_CLASSES_STATUS,
  registrationForm: [String],
  evaluationScheme: String,
  about: String,
  enrolmentControls: [
    {
      type: "SELECT",
      name: "age",
      value:
        [] /** should be an array of values from 1 to 16, It is going to be multi select dropdown in UI */,
    },
    {
      type: "SELECT",
      name: "gender",
      value: [
        "MALE",
        "FEMALE",
      ] /** its an array and can contain any or both values. It is going to be used as multi select dropdown in UI */,
    },
  ],
  session: [
    /** session ids */
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
};
