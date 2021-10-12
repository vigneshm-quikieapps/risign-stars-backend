const calculateSubtotal = require("./calculateSubtotal");

const generateBillPayload = (data) => {
  let {
    billDate,
    dueDate,
    items,
    memberId,
    businessId,
    classId,
    clubMembershipId,
  } = data;

  let subtotal = calculateSubtotal(items);
  let discount = 0;
  let total = subtotal - discount;

  return {
    memberId,
    businessId,
    classId,
    items,
    subtotal,
    discount,
    total,
    dueDate,
    billDate,
    clubMembershipId,
  };
};

module.exports = generateBillPayload;
