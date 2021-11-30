const { Bill } = require("../../../../models");

const getResourceBusinessIdForBill = async (req, res) => {
  let billId = req.body.billId;
  //console.log("sessionId:", sessionId);

  let bill = await Bill.findById(billId);
  if (!bill) return false;
  if (bill) {
    //console.log("bussinessId from bill:", bill.businessId);
    return bill.businessId.toString();
  }
};
module.exports = getResourceBusinessIdForBill;
