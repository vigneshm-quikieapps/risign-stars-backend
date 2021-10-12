const moment = require("moment");

/**
 * currently, the club membership fee is the only annual fee
 *
 * @param {*} data
 * @returns
 */
const generateClubMembershipBillPayload = (data) => {
  let { billDate, dueDate, charges, memberId, businessId, classId } = data;

  /** mapping charges */
  let items = charges.map(({ id, name, amount }) => {
    return {
      id,
      name,
      amount,
      startDate: moment(billDate).startOf("day").toISOString(),
      endDate: moment(billDate).add(1, "years").endOf("day").toISOString(),
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

module.exports = generateClubMembershipBillPayload;
