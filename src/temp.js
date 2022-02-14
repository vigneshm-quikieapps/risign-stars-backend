// Template for Creating the modal
module.exports.Activity = {
  _id: String,
  name: String,
  businessId: String,
  status: [String],
  registrationForm: [String],
  evaluationScheme: String,
  about: String,
  enrolmentControls: [
    {
      type: "age",
      value: 3,
    },
  ],
  classes: [
    /** class id */
  ],
  charges: [
    {
      name: String,
      amount: String,
      mandatory: Boolean,
      payFrequency: ["Monthly", "Annual"],
    },
  ],
  createdAt: Date,
  updatedAt: Date,
};
