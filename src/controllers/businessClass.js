const BusinessClass = require("../models/businessClass");

const { validationResult } = require("express-validator");

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
        err: "cannot find business Class by id",
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

//Business Class listing all

module.exports.getAllBusinessClass= (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : "";
  let page = req.query.page;
  let skip = page ? parseInt(page) - 1 * limit : "";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

    BusinessClass.find()
    .populate("category").populate("business").populate("evaluation").populate("session")
    .sort([[sortBy, "asc"]])
    .skip(skip)
    .limit(limit)
    .exec((err, Class) => {
      if (err) {
        return res.status(400).json({
          err: "cannot find Business Classes",
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

//Business Class delete

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
