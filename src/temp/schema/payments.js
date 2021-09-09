/**
 * API's
 * 1. get payments of a student by a particular month
 * 2. get payments of members in a session by month
 * 3. get payment details of members in
 *
 * FAQ's
 *
 * Notes
 * 1. Bill generation will be done on last date of a month.
 * 2.
 */

module.exports.payments = {
  id: String,
  sessionId: String,
  classId: String,
  businessId: String,
  members: {
    id: String,
    name: String,
  },
  paidAt: Date,
  createdAt: Date,
  updatedAt: Date,
};
