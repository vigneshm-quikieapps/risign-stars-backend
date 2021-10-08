const { PAY_FREQUENCY_MONTHLY } = require("../../contants/class");
const calcPartialCharge = require("./calcPartialCharge");

/**
 * generate the first month bill
 *
 * if member has already been enrolled in the class
 *
 *
 * @param {*} param0
 * @returns
 */
const generateFirstMonthBillPayload = ({ startDate, charges }) => {
  let monthlyCharges = charges.filter(
    (charge) => charge.payFrequency === PAY_FREQUENCY_MONTHLY
  );
  let firstMonthPartialCharges = monthlyCharges.map((charge) =>
    calcPartialCharge(startDate, charge)
  );

  let billPayload = {};
  return billPayload;
};
module.exports = generateFirstMonthBillPayload;
