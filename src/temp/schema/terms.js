/**
 * API's
 * 1. CRUD of terms
 */
module.exports.terms = {
  id: String,
  businessId: String,
  code: String /** unique for a business */,
  label: String,
  startDate: Date,
  endDate: Date,
  createdAt: Date,
  createdBy: "userId",
  lastUpdatedAt: Date,
  lastUpdatedBy: "userid",
};
