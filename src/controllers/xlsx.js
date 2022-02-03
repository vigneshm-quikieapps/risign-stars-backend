const DoesNotExistError = require("../exceptions/DoesNotExistError");
const Xlsx = require("../models/Xlsx");

//get one Xlsx by id
module.exports.getXlsxById = async (req, res) => {
  try {
    let { xlsxId } = req.params;
    let xlsx = await Xlsx.findById(xlsxId);
    if (!xlsx) {
      throw new DoesNotExistError();
    }
    return res.send({ xlsx });
  } catch (err) {
    console.error(err);
    return res.status(422).send({ message: err.message });
  }
};

//get all Xlsx
module.exports.getAllXlsx = async (req, res) => {
  try {
    let xlsx = await Xlsx.find().sort({ createdAt: "desc" });
    if (!xlsx) {
      throw new DoesNotExistError();
    }
    return res.send({ xlsx });
  } catch (err) {
    console.error(err);
    return res.status(422).send({ message: err.message });
  }
};
