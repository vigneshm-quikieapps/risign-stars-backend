const calcPartialCharge = require("./calcPartialCharge");
const generateMonthBillPayload = require("./generateMonthBillPayload");

/**
 * generate the first month bill
 *
 * if member has already been enrolled in the class
 * charges contains only the charges with payFrequency === "MONTHLY"
 *
 *
 * @param {*} param0
 * @returns
 */
const generatePartialMonthBillPayload = (data) => {
  let { pattern, charges, startDate, endDate } = data;

  let monthlyPartialCharges = charges.map((charge) => {
    let partialCharge = calcPartialCharge({
      pattern,
      startDate,
      endDate,
      charge,
    });
    charge.amount = partialCharge;
    return charge;
  });

  return generateMonthBillPayload({
    ...data,
    charges: monthlyPartialCharges,
  });
};
module.exports = generatePartialMonthBillPayload;
