const DoesNotExistError = require("../exceptions/DoesNotExistError");
const User = require("../models/User");
const { STARTS_WITH_FILTER, EQUALS_FILTER } = require("../constants/constant");
const { getQuery, getOptions } = require("../helpers/query");
const { Types } = require("mongoose");

module.exports.getUserById = (req, res, next, id) => {
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
    let data = req.body;
    let password = User.generatePassword();
    data.password = password;
    let user = await User.create(data);
    return res
      .status(201)
      .send({ message: "added successfully", user, password });
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
      throw new DoesNotExistError();
    }
    return res.send({ user });
  } catch (err) {
    console.error(err);
    return res.status(422).send({ message: err.message });
  }
};

/**
 * search for User / list all user
 *
 * e.g: How to send the filter request, in other words filtering by a name field that start with p
 * ?filters[0][field]=name&filters[0][type]=STARTS_WITH&filters[0][value]=p
 */
module.exports.getAll = async (req, res) => {
  try {
    let query = getQuery(req);
    let options = getOptions(req);

    let response = await User.paginate(query, options);
    return res.send(response);
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};

//user type Coach listing all /search for Coach
module.exports.getAllCoach = (req, res) => {
  //limit setter to export or send limited business to client or front end

  let limit = req.query.limit ? parseInt(req.query.limit) : 10;
  let page = req.query.page;

  let skip = page ? parseInt(page) - 1 * limit : 0;
  let sortBy = req.query.sortBy ? req.query.sortBy : "asc";

  /**
   * query object
   */
  let businessId = req.params.businessId;
  let cond = {
    userTypes: "COACH",
    "dataPrivileges.businessId": Types.ObjectId(businessId),
  };

  let query = User.find(cond).sort({ _id: sortBy }).skip(skip).limit(limit);

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
  query.exec((err, Coach) => {
    if (err) {
      return res.status(400).json({
        error: "NO Coach FOUND",
      });
    }
    res.json(Coach);
  });
};

/**
 * The following fields should not be allowed to be updated in the update endpoint
 *
 * @param {*} payload
 * @returns
 */
const getUserPayload = (payload) => {
  let blacklist = [
    "email",
    "mobileNo",
    "emailVerfied",
    "mobileNoVerified",
    "password",
  ];

  blacklist.forEach((field) => {
    delete payload[field];
  });

  return payload;
};

/**
 * Note: the following fields should not not be updated in this endpoint
 * email, mobileNo, emailVerified, mobileNoVerified, password
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
module.exports.update = async (req, res) => {
  try {
    let { userId } = req.params;
    let options = { new: true };
    let updatePayload = getUserPayload({ ...req.body });
    let role = await User.findByIdAndUpdate(userId, updatePayload, options);
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
    let { userId } = req.params;
    let { deletedCount } = await User.deleteOne({ _id: userId });
    if (!deletedCount) {
      throw new DoesNotExistError();
    }
    return res.send({ message: "deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(422).send({ message: err.message });
  }
};
