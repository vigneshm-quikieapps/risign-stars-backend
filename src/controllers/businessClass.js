const BusinessClass = require("../models/businessClass");

const { validationResult } = require("express-validator");
const { STARTS_WITH_FILTER, EQUALS_FILTER } = require("../contants/constant");

//parameter extractor
module.exports.getBusinessClassIdById = (req, res, next, id) => {
  BusinessClass.findById(id)
    .populate("category")
    .populate("business")
    .populate("evaluation")
    .populate("session")
    .exec((err, Class) => {
      if (err) {
        return res.status(400).json({
          err: "cannot find business Class by id enter a valid ID",
        });
      }
      req.Class = Class;
      next();
    });
};

//Business Class creation

module.exports.createBusinessClass = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  const Class = new BusinessClass(req.body);
  Class.save((err, Class) => {
    if (err) {
      console.log(err);
      console.log(req.body);

      return res.status(400).json({
        error: "unable to save Business Class to database",
      });
    }
    res.json(Class);
  });
};

//Business Class listing all / search for Class
module.exports.getAllBusinessClass = (req, res) => {
  //limit setter to export or send limited business to client or front end

  let limit = req.query.limit ? parseInt(req.query.limit) : 10;
  let page = req.query.page;

  let skip = page ? parseInt(page) - 1 * limit : 0;
  let sortBy = req.query.sortBy ? req.query.sortBy : "asc";

  /**
   * query object
   */
  let query = BusinessClass.find()
    .sort({ _id: sortBy })
    .skip(skip)
    .limit(limit);

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
  query.exec((err, Class) => {
    if (err) {
      return res.status(400).json({
        error: "NO Class FOUND",
      });
    }
    res.json(Class);
  });
};

//Business Class listing

module.exports.getBusinessClass = (req, res) => {
  return res.json(req.Class);
};

//Business Class Update

module.exports.updateBusinessClass = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  BusinessClass.findByIdAndUpdate(
    { _id: req.Class._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, Class) => {
      if (err) {
        return res.status(400).json({
          err: "sorry Business Class Not Updated ",
        });
      }

      res.json(Class);
    }
  );
};
//middleware for resticting deletion if session is present
module.exports.isBusinessClassRestricted = (req, res, next) => {
  let Class = req.Class;
  if (!Class) {
    return res.status(400).json({
      err: "Please Enter A valid Bussiness ID ",
    });
  }
  if (Class.session) {
    return res.status(400).json({
      err: "Class deletion is Restricted as there are active Sessions Present ",
    });
  }

  next();
};

module.exports.deleteBusinessClass = (req, res) => {
  const Class = req.Class;
  Class.remove((err, Class) => {
    if (err) {
      return res.status(400).json({
        err: "unable to delete Business Class",
      });
    }
    res.json(Class);
  });
};
