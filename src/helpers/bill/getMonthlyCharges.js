const { PAY_FREQUENCY_MONTHLY } = require("../../constants/class");

/**
 * filter charges, only keep charges with monthly pay frequency
 * @param {*} charges
 * @returns
 */
const getMonthlyCharges = (charges) => {
  return charges.filter(
    (charge) => charge.payFrequency === PAY_FREQUENCY_MONTHLY
  );
};

module.exports = getMonthlyCharges;
