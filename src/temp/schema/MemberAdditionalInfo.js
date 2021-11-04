module.exports.MemberAdditionalInfo = {
  memberId: String,
  businessId: String,
  newsletter: {
    email: Boolean,
    telephone: Boolean,
    sms: Boolean,
  },
  createdAt: Date,
  createdBy: String /** userId */,
  lastUpdatedAt: Date,
  lastUpdatedBy: String /** userId */,
};
