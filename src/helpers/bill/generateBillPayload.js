const calculateSubtotal = require("./calculateSubtotal");

const generateBillPayload = (data) => {
  let {
    billDate,
    businessId,
    classId,
    clubMembershipId,
    dueDate,
    generatedAt,
    items,
    memberId,
    enrolmentId
  } = data;

  let subtotal = calculateSubtotal(items);
  let discount = 0;
  let total = subtotal - discount;

  return {
    billDate,
    businessId,
    classId,
    clubMembershipId,
    discount,
    dueDate,
    generatedAt,
    items,
    memberId,
    subtotal,
    total,
    enrolmentId
  };
};

module.exports = generateBillPayload;
