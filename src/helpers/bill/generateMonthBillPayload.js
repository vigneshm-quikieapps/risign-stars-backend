/**
 *
 * @param {*} param0
 * @returns
 */
const generateMonthBillPayload = (data) => {
  let { billDate, dueDate, monthlyCharges, memberId, businessId, classId } =
    data;

  /** mapping monthly charges */
  let items = monthlyCharges.map(({ name, amount }) => {
    return {
      name,
      amount,
    };
  });

  let subtotal = items.reduce((a, b) => a + b);
  let discount = 0;
  let total = subtotal - discount;

  let billPayload = {
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
  return billPayload;
};

module.exports = generateMonthBillPayload;
