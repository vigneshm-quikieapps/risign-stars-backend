const Progress = require("../models/progress");

const { validationResult } = require("express-validator");

//pogress extractor
module.exports.getProgressIdById = (req, res, next, id) => {
  Progress.findById(id).exec((err, progress) => {
    if (err) {
      return res.status(400).json({
        err: "cannot find evaluation by id",
      });
    }
    req.progress = progress;
    next();
  });
};

//pogress creation

module.exports.createProgress = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  const progress = new Progress(req.body);
  progress.save((err, progress) => {
    if (err) {
      console.log(err);
      console.log(req.body);

      return res.status(400).json({
        error: "unable to save evaluation to database",
      });
    }
    res.json(progress);
  });
};

//pogress listing all

module.exports.getAllProgress = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 10;
  let page = req.query.page;
  let skip = page ? parseInt(page) - 1 * limit : 0;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Evaluation.find()
    .sort([[sortBy, "asc"]])
    .skip(skip)
    .limit(limit)
    .exec((err, progress) => {
      if (err) {
        return res.status(400).json({
          err: "cannot find category by id",
        });
      }
      res.json(progress);
    });
};


//pogress listing

module.exports.getProgress = (req, res) => {
  return res.json(req.progress);
};

//pogress Update

module.exports.updateProgress = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  Progress.findByIdAndUpdate(
    { _id: req.progress._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, progress) => {
      if (err) {
        return res.status(400).json({
          err: "you are not ",
        });
      }

      res.json(progress);
    }
  );
};









