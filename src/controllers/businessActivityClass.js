const BusinessActivityClass = require("../models/businessActivityclass");

//const { validationResult } = require("express-validator");

//parameter extractor
module.exports.getBusinessActivityClassIdById = (req, res, next, id) => {
    BusinessActivityClass.findById(id)
        .populate("coach")
        .exec((err, activityClass) => {
    if (err) {
      return res.status(400).json({
        err: "cannot find business activityClass by id",
      });
    }
    req.activityClass = activityClass;
    next();
  });
};

//Business activityClass creation

module.exports.createBusinessActivityClass = (req, res) => {
  
  const activityClass = new BusinessActivityClass(req.body);
  activityClass.save((err, activityClass) => {
    if (err) {
      console.log(err);
      console.log(req.body);

      return res.status(400).json({
        error: "unable to save Business Activity to database",
      });
    }
    res.json(activityClass);
  });
};

//Business activityClass listing all

module.exports.getAllBusinessActivityClass= (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : "";
  let page = req.query.page;
  let skip = page ? parseInt(page) - 1 * limit : "";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

    BusinessActivityClass.find()
    .populate("coach")
    .sort([[sortBy, "asc"]])
    .skip(skip)
    .limit(limit)
    .exec((err, activityClass) => {
      if (err) {
        return res.status(400).json({
          err: "cannot find Business activityClasses",
        });
      }
      res.json(activityClass);
    });
};

//Business activityClass listing

module.exports.getBusinessActivityClass = (req, res) => {
  return res.json(req.activityClass);
};

//Business activityClass Update

module.exports.updateBusinessActivityClass = (req, res) => {
  

  BusinessActivityClass.findByIdAndUpdate(
    { _id: req.activityClass._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, activityClass) => {
      if (err) {
        return res.status(400).json({
          err: "sorry Business activityClass Not Updated ",
        });
      }

      res.json(activityClass);
    }
  );
};

//Business activityClass delete

module.exports.deleteBusinessActivityClass = (req, res) => {
  const activityClass = req.activityClass;
  activityClass.remove((err, activityClass) => {
    if (err) {
      return res.status(400).json({
        err: "unable to delete Business activityClass",
      });
    }
    res.json(activityClass);
  });
};
