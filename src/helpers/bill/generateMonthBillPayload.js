/**
 *
 * @param {*} param0
 * @returns
 */
const generateMonthBillPayload = (data) => {
  let { billDate, dueDate, charges, memberId, businessId, classId } = data;

  /** mapping monthly charges */
  let items = charges.map(({ name, amount }) => {
    return {
      name,
      amount,
    };
  });

  let subtotal = items.reduce((a, b) => a + b);
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
  };
};

module.exports = generateMonthBillPayload;
