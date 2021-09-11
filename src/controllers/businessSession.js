const BusinessSession = require("../models/businessSession");

const { validationResult } = require("express-validator");

//parameter extractor
module.exports.getBusinessSessionIdById = (req, res, next, id) => {
    BusinessSession.findById(id)
        .populate("coach")
        .exec((err, Session) => {
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
   const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
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

//Business Session listing all

module.exports.getAllBusinessSession= (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : "";
  let page = req.query.page;
  let skip = page ? parseInt(page) - 1 * limit : "";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

    BusinessSession.find()
    .populate("coach")
    .sort([[sortBy, "asc"]])
    .skip(skip)
    .limit(limit)
    .exec((err,Session) => {
      if (err) {
        return res.status(400).json({
          err: "cannot find Business Sessions",
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
   const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

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
