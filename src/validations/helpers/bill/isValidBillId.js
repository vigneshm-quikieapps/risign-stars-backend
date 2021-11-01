const { Bill } = require("../../../models");

const isValidBillId = async (billId) => {
  try {
    let bill = await Bill.findById(billId);

    if (!bill) {
      throw new Error("Bill not found");
    }

    return true;
  } catch (err) {
    return Promise.reject(err.message);
  }
};

module.exports = isValidBillId;
