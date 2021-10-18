const calcPartialCharge = require("./calcPartialCharge");
const generateMonthBillPayload = require("./generateMonthBillPayload");

/**
 * generate the partial bill, if the member has not attended the full class
 *
 * charges contains only the charges with payFrequency === "MONTHLY"
 *
 *
 * @param {*} param0
 * @returns
 */
const generatePartialMonthBillPayload = (data) => {
  let { pattern, charges, startDate, endDate } = data;

  console.log({ startDate, endDate });

  let monthlyPartialCharges = charges.map((charge) => {
    let partialCharge = calcPartialCharge({
      pattern,
      startDate,
      endDate,
      charge,
    });
    console.log({ partialCharge });
    charge.amount = partialCharge;
    return charge;
  });

  return generateMonthBillPayload({
    ...data,
    charges: monthlyPartialCharges,
  });
};
module.exports = generatePartialMonthBillPayload;
