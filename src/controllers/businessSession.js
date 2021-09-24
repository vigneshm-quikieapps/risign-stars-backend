const BusinessSession = require("../models/businessSession");

const { validationResult } = require("express-validator");
const { STARTS_WITH_FILTER, EQUALS_FILTER } = require("../contants/constant");
const { json } = require("express");

//parameter extractor
module.exports.getBusinessSessionIdById = (req, res, next, id) => {
  BusinessSession.findById(id).exec((err, Session) => {
    if (err) {
      return res.status(400).json({
        err: "cannot find business Session by id",
      });
    }
    req.businessSession = Session;
    next();
  });
};

//Business Session creation

module.exports.createBusinessSession = (req, res) => {
  const Session = new BusinessSession(req.body);
  Session.save((err, Session) => {
    if (err) {
      console.log(err);
      console.log(req.body);

      return res.status(400).json({
        error: "unable to save Business Session to database",
      });
    }
    res.json(Session);
  });
};

//Business Session listing all /search for Class
module.exports.getAllBusinessSession = (req, res) => {
  //limit setter to export or send limited business to client or front end

  let limit = req.query.limit ? parseInt(req.query.limit) : 10;
  let page = req.query.page;

  let skip = page ? parseInt(page) - 1 * limit : 0;
  let sortBy = req.query.sortBy ? req.query.sortBy : "asc";

  /**
   * query object
   */
  let cond = { classId: req.params.classId };

  let query = BusinessSession.find(cond)
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
  query.exec((err, Session) => {
    if (err) {
      return res.status(400).json({
        error: "NO Session FOUND",
      });
    }
    res.json(Session);
  });
};

//Business Session listing

module.exports.getBusinessSession = (req, res) => {
  return res.json(req.businessSession);
};

//Business Session Update

module.exports.updateBusinessSession = (req, res) => {
  BusinessSession.findByIdAndUpdate(
    { _id: req.businessSession._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, Session) => {
      if (err) {
        return res.status(400).json({
          err: "sorry Business activityClass Not Updated ",
        });
      }

      res.json(Session);
    }
  );
};

//Business Session delete

module.exports.deleteBusinessSession = (req, res) => {
  const Session = req.businessSession;
  Session.remove((err, Session) => {
    if (err) {
      return res.status(400).json({
        err: "unable to delete Business activityClass",
      });
    }
    res.json(Session);
  });
};
