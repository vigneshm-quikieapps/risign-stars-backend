const DoesNotExistException = require("../exceptions/DoesNotExistException");
const User = require("../models/User");

const generatePassword = require("../helpers/auth/generatePassword");
const generateHash = require("../helpers/auth/generateHash");

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

module.exports.getAll = async (req, res) => {
  try {
    let users = await User.find({});
    return res.send({ users });
  } catch (err) {
    console.error(err);
    return res.status(422).send({ message: err.message });
  }
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
