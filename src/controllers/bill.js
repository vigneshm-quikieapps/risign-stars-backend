const { Bill } = require("../models");
const { getQuery, getOptions } = require("../helpers/query");
const { PAYMENT_METHOD_MANUAL } = require("../constants/bill");

module.exports.getAll = async (req, res) => {
  try {
    let query = getQuery(req);
    let options = getOptions(req);
    let response = await Bill.paginate(query, options);
    return res.send(response);
  } catch (err) {
    return res.send({ message: err.message });
  }
};

module.exports.billsOfAMemberInAClass = async (req, res) => {
  try {
    let query = getQuery(req);
    let { memberId, classId } = req.body;
    query = { ...query, memberId, classId };
    let options = getOptions(req);

    let response = await Bill.paginate(query, options);
    return res.send(response);
  } catch (err) {
    return res.send({ message: err.message });
  }
};

module.exports.billsOfAMemberInABusiness = async (req, res) => {
  try {
    let query = getQuery(req);
    let { memberId, businessId } = req.body;
    query = { ...query, memberId, businessId };
    let options = getOptions(req);

    let response = await Bill.paginate(query, options);
    return res.send(response);
  } catch (err) {
    return res.send({ message: err.message });
  }
};

module.exports.enterTransaction = async (req, res) => {
  try {
    let { billId, reference, type } = req.body;
    let now = new Date();

    let update = {
      $set: {
        reference,
        method: PAYMENT_METHOD_MANUAL,
        type,
        paidAt: now,
      },
    };
    let options = { new: true, useFindAndModify: false };

    let bill = await Bill.findByIdAndUpdate(billId, update, options);

    return res.send({ message: "transaction recorded", bill });
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};
