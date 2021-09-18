const { EQUALS_FILTER, STARTS_WITH_FILTER } = require("../contants/constant");
const DoesNotExistError = require("../exceptions/DoesNotExistError");
const Role = require("../models/Role");

//search for Role/ get all role
module.exports.getAll = (req, res) => {
  //limit setter to export or send limited business to client or front end

  let limit = req.query.limit ? parseInt(req.query.limit) : 10;
  let page = req.query.page;

  let skip = page ? parseInt(page) - 1 * limit : 0;
  let sortBy = req.query.sortBy ? req.query.sortBy : "asc";

  /**
   * query object
   */
  let query = Role.find().sort({ _id: sortBy }).skip(skip).limit(limit);

  /**
   * filter
   */
  let { filters = [] } = req.query;
  for (let { field, type, value } of filters) {
    switch (type) {
      case STARTS_WITH_FILTER:
        query.where(`${field}`, {
          $regex: new RegExp(`^${value}`, "i"),
        });
        break;
      case EQUALS_FILTER:
        query.where(`${field}`, value);
        break;
      default:
        break;
    }
  }

  /**
   * execute the query
   */
  query.exec((err, Role) => {
    if (err) {
      return res.status(400).json({
        error: "NO Role FOUND",
      });
    }
    res.json(Role);
  });
};

module.exports.create = async (req, res) => {
  try {
    let role = await Role.create(req.body);
    return res.status(201).send({ message: "added successfully", role });
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
    let role = await Role.findByIdAndUpdate(roleId, req.body, options);
    if (!role) {
      throw new DoesNotExistError();
    }
    return res.send({ message: "updated successfully", role });
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
