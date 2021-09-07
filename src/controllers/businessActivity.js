const BusinessActivity = require("../models/businessActivity");

//const { validationResult } = require("express-validator");

//parameter extractor
module.exports.getBusinessActivityIdById = (req, res, next, id) => {
    BusinessActivity.findById(id)
      .populate("category")
      .populate("business")
      .populate("evaluation")
      .populate("class")
        .exec((err, activity) => {
    if (err) {
      return res.status(400).json({
        err: "cannot find business activity by id",
      });
    }
    req.activity = activity;
    next();
  });
};

//Business Activity creation

module.exports.createBusinessActivity = (req, res) => {
  
  const activity = new BusinessActivity(req.body);
  activity.save((err, activity) => {
    if (err) {
      console.log(err);
      console.log(req.body);

      return res.status(400).json({
        error: "unable to save Business Activity to database",
      });
    }
    res.json(activity);
  });
};

//Business Activity listing all

module.exports.getAllBusinessActivity= (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : "";
  let page = req.query.page;
  let skip = page ? parseInt(page) - 1 * limit : "";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

    BusinessActivity.find()
    .populate("category").populate("business").populate("evaluation").populate("class")
    .sort([[sortBy, "asc"]])
    .skip(skip)
    .limit(limit)
    .exec((err, activity) => {
      if (err) {
        return res.status(400).json({
          err: "cannot find Business Activities",
        });
      }
      res.json(activity);
    });
};

//Business Activity listing

module.exports.getBusinessActivity = (req, res) => {
  return res.json(req.activity);
};

//Business Activity Update

module.exports.updateBusinessActivity = (req, res) => {
  

  BusinessActivity.findByIdAndUpdate(
    { _id: req.activity._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, activity) => {
      if (err) {
        return res.status(400).json({
          err: "sorry Business Activity Not Updated ",
        });
      }

      res.json(activity);
    }
  );
};

//Business Activity delete

module.exports.deleteBusinessActivity = (req, res) => {
  const activity = req.activity;
  activity.remove((err, activity) => {
    if (err) {
      return res.status(400).json({
        err: "unable to delete Business Activity",
      });
    }
    res.json(activity);
  });
};
