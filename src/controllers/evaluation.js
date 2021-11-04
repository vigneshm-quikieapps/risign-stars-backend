const Evaluation = require("../models/evaluation");

const { validationResult } = require("express-validator");

//parameter extractor
module.exports.getEvaluationIdById = (req, res, next, id) => {
  Evaluation.findById(id).exec((err, evaluation) => {
    if (err) {
      return res.status(400).json({
        err: "cannot find evaluation by id",
      });
    }
    req.evaluation = evaluation;
    next();
  });
};

//Evaluation creation

module.exports.createEvaluation = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  const evaluation = new Evaluation(req.body);
  evaluation.save((err, evaluation) => {
    if (err) {
      console.log(err);
      console.log(req.body);

      return res.status(400).json({
        error: "unable to save evaluation to database",
      });
    }
    res.json(evaluation);
  });
};

//Evaluation listing all

module.exports.getAllEvaluations = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 10;
  let page = req.query.page;
  let skip = page ? parseInt(page) - 1 * limit : 0;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Evaluation.find()
    .sort([[sortBy, "asc"]])
    .skip(skip)
    .limit(limit)
    .exec((err, evaluation) => {
      if (err) {
        return res.status(400).json({
          err: "cannot find category by id",
        });
      }
      res.json(evaluation);
    });
};

//Evaluation listing

module.exports.getEvaluation = (req, res) => {
  return res.json(req.evaluation);
};

//Evaluation Update

module.exports.updateEvaluation = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  Evaluation.findByIdAndUpdate(
    { _id: req.evaluation._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, evaluation) => {
      if (err) {
        return res.status(400).json({
          err: "you are not ",
        });
      }

      res.json(evaluation);
    }
  );
};

//Evaluation delete

module.exports.deleteEvaluation = (req, res) => {
  const evaluation = req.evaluation;
  evaluation.remove((err, evaluation) => {
    if (err) {
      return res.status(400).json({
        err: "unable to delete category",
      });
    }
    res.json(evaluation);
  });
};
