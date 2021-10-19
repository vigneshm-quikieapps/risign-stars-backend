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

  let monthlyPartialCharges = charges.map((charge) => {
    let partialCharge = calcPartialCharge({
      pattern,
      startDate,
      endDate,
      charge,
    });

    /**
     * tried to copy the charge object using the object spread operator.
     * but it resulted in some unexpected results
     * so, used the stringify then parse for copying the charge object
     */
    let monthlyPartialCharge = JSON.parse(JSON.stringify(charge));
    monthlyPartialCharge.amount = partialCharge;
    return monthlyPartialCharge;
  });

  return generateMonthBillPayload({
    ...data,
    charges: monthlyPartialCharges,
  });
};

module.exports = generatePartialMonthBillPayload;
