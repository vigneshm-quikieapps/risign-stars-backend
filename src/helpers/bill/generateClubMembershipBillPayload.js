const moment = require("moment");
const generateBillPayload = require("./generateBillPayload");

/**
 * currently, the club membership fee is the only annual fee
 *
 * @param {*} data
 * @returns
 */
const generateClubMembershipBillPayload = (data) => {
  let { billDate, charges } = data;

  /** mapping charges */
  let items = charges.map(({ id, name, amount }) => {
    return {
      chargeId: id,
      name,
      amount,
      startDate: moment(billDate).startOf("day").toISOString(),
      endDate: moment(billDate).add(1, "years").endOf("day").toISOString(),
    };
  });

  return generateBillPayload({ ...data, items });
};

module.exports = generateClubMembershipBillPayload;
