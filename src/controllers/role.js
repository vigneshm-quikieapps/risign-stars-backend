const DoesNotExistError = require("../exceptions/DoesNotExistError");
const { getQuery, getOptions } = require("../helpers/query");
const Role = require("../models/Role");

//search for Role/ get all role
module.exports.getAll = async (req, res) => {
  try {
    let query = getQuery(req);
    let options = getOptions(req);

    let response = await Role.paginate(query, options);
    return res.send(response);
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};

module.exports.create = async (req, res) => {
  try {
    await Role.create({ ...req.body, createdBy: req.authUserData._id });
    return res.status(201).send({ message: "added successfully" });
  } catch (err) {
    console.error(err);
    return res.status(422).send({ message: err.message });
  }
};

module.exports.get = async (req, res) => {
  try {
    let { roleId } = req.params;
    let role = await Role.findById(roleId);
    if (!role) {
      throw new DoesNotExistError();
    }
    return res.send({ role });
  } catch (err) {
    console.error(err);
    return res.status(422).send({ message: err.message });
  }
};

module.exports.update = async (req, res) => {
  try {
    let { roleId } = req.params;
    let options = { new: true };
    let role = await Role.findByIdAndUpdate(
      roleId,
      { ...req.body, updatedBy: req.authUserData._id },
      options
    );
    if (!role) {
      throw new DoesNotExistError();
    }
    return res.send({ message: "updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(422).send({ message: err.message });
  }
};

module.exports.delete = async (req, res) => {
  try {
    let { roleId } = req.params;
    let { deletedCount } = await Role.deleteOne({ _id: roleId });
    if (!deletedCount) {
      throw new DoesNotExistError();
    }
    return res.send({ message: "deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(422).send({ message: err.message });
  }
};
