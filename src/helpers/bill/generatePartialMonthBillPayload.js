const calcPartialCharge = require("./calcPartialCharge");
const generateMonthBillPayload = require("./generateMonthBillPayload");

/**
 * generate the first month bill
 *
 * if member has already been enrolled in the class
 *
 *
 * @param {*} param0
 * @returns
 */
const generatePartialMonthBillPayload = (data) => {
  let { monthlyCharges, startDate, endDate } = data;

  let monthlyPartialCharges = monthlyCharges.map((charge) => {
    let partialCharge = calcPartialCharge({ startDate, endDate, charge });
    return (charge.amount = partialCharge);
  });

  return generateMonthBillPayload({
    ...data,
    monthlyCharges: monthlyPartialCharges,
  });
};
module.exports = generatePartialMonthBillPayload;
