const session = require("../models/session");
const DoesNotExistError = require("../exceptions/DoesNotExistError");

//UpdateMember
module.exports.update = async (req, res) => {
  try {
    let options = { new: true };
    console.log(req.params.id);
    let student = await session.findByIdAndUpdate(
      req.params.id,
      req.body,
      options
    );
    if (!student) {
      throw new DoesNotExistError();
    }
    return res.send({ message: "updated successfully", student });
  } catch (err) {
    console.error(err);
    return res.status(422).send({ message: err.message });
  }
};
