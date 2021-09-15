const DoesNotExistException = require("../exceptions/DoesNotExistException");
const User = require("../models/User");

const generatePassword = require("../helpers/auth/generatePassword");
const generateHash = require("../helpers/auth/generateHash");
const { STARTS_WITH_FILTER, EQUALS_FILTER } = require("../contants/constant");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: "No User was Found in DB",
      });
    }
    req.profile = user;
    next();
  });
};


module.exports.create = async (req, res) => {
  try {
    let password = generatePassword();

    let data = req.body;
    data.password = generateHash(password);

    let user = await User.create(data);
    return res.status(201).send({ message: "added successfully", user });
  } catch (err) {
    console.error(err);
    return res.status(422).send({ message: err.message });
  }
};

module.exports.get = async (req, res) => {
  try {
    let { userId } = req.params;
    let user = await User.findById(userId);
    if (!user) {
      throw new DoesNotExistException();
    }
    return res.send({ user });
  } catch (err) {
    console.error(err);
    return res.status(422).send({ message: err.message });
  }
};

//search for User / list all user
module.exports.getAll = (req, res) => {
  //limit setter to export or send limited business to client or front end

  let limit = req.query.limit ? parseInt(req.query.limit) : 10;
  let page = req.query.page;

  let skip = page ? parseInt(page) - 1 * limit : 0;
  let sortBy = req.query.sortBy ? req.query.sortBy : "asc";

  /**
   * query object
   */
  let query = User.find().sort({ _id: sortBy }).skip(skip).limit(limit);

  /**
   * filter
   */
  let { filters = [] } = req.query;
  for (let { field, type, value } of filters) {
    switch (type) {
      case STARTS_WITH_FILTER:
        query.where(`${field}`, { $regex: new RegExp(`^${value}`, "i") });
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
  query.exec((err, User) => {
    if (err) {
      return res.status(400).json({
        error: "NO User FOUND",
      });
    }
    res.json(User);
  });
};


module.exports.update = async (req, res) => {
  try {
    let { userId } = req.params;
    let options = { new: true };
    let role = await User.findByIdAndUpdate(userId, req.body, options);
    if (!role) {
      throw new DoesNotExistException();
    }
    return res.send({ message: "updated successfully", role });
  } catch (err) {
    console.error(err);
    return res.status(422).send({ message: err.message });
  }
};

module.exports.delete = async (req, res) => {
  try {
    let { userId } = req.params;
    let { deletedCount } = await User.deleteOne({ _id: userId });
    if (!deletedCount) {
      throw new DoesNotExistException();
    }
    return res.send({ message: "deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(422).send({ message: err.message });
  }
};
