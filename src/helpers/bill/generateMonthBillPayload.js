const generateBillPayload = require("./generateBillPayload");

/**
 *
 * charges contains only the charges with payFrequency === "MONTHLY"
 *
 * @param {*} param0
 * @returns
 */
const generateMonthBillPayload = (data) => {
  let { charges } = data;

  /** mapping monthly charges */
  let items = charges.map(({ _id, name, amount }) => {
    return {
      chargeId: _id,
      name,
      amount,
    };
  });

  return generateBillPayload({ ...data, items });
};

module.exports = generateMonthBillPayload;
