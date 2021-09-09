/**
 * API's
 * 1. get payments of a student by a particular month
 * 2. get payments of members in a session by month
 * 3. get payment details of members in
 *
 * FAQ's
 *
 * Notes
 * 1. Bill generation use cases is yet to be received from client
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
  subAmount: Number /** amount before discount */,
  discount: Number,
  amount: Number /** amount after discount */,
  paid: Number,
  dueDate: Date,
  referenceId: String,
  paidAt: Date,
  comments: String,
  createdAt: Date,
  updatedAt: Date,
};
