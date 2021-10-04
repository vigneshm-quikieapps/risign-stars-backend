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
module.exports.Bill = {
  id: String,
  classId: String,
  businessId: String,
  memberId: String,
  items: [
    {
      description: String,
      amount: Number,
    },
  ],
  subTotal: Number /** amount before discount */,
  discount: Number,
  total: Number /** amount after discount */,
  discountId: String,
  paid: Number,
  dueDate: Date,
  referenceId: String,
  paidAt: Date,
  comments: String,
  createdAt: Date,
  createdBy: String /** userId */,
  lastUpdatedAt: Date,
  lastUpdatedBy: String /** userId */,
};
