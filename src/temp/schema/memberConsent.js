module.exports.MemberConsent = {
  memberId: String,
  businessId: String,
  consent: {
    allergies: String,
    condition: String,
    photographConsent: Boolean,
    signedByParent: Boolean,
    signedAt: Date,
  },
  createdAt: Date,
  createdBy: String /** User id */,
  updatedAt: Date,
  updatedBy: String /** User id */,
};
