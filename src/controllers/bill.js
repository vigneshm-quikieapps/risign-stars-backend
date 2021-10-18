const { Bill } = require("../models");

module.exports.getAll = async (req, res) => {
  try {
    let response = await Bill.paginate({});
    return res.send(response);
  } catch (err) {
    return res.send({ message: err.message });
  }
};
