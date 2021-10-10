const { PAY_FREQUENCY_MONTHLY } = require("../../constants/class");

const getMonthlyCharges = (charges) => {
  return charges.filter(
    (charge) => charge.payFrequency === PAY_FREQUENCY_MONTHLY
  );
};

module.exports = getMonthlyCharges;
