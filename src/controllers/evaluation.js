const { EvaluationScheme } = require("../models");
const { getPaginationOptions } = require("../helpers/query");

//parameter extractor
module.exports.getEvaluationIdById = (req, res, next, id) => {
  EvaluationScheme.findById(id).exec((err, evaluation) => {
    if (err) {
      return res.status(400).json({
        err: "cannot find evaluation by id",
      });
    }
    req.evaluation = evaluation;
    next();
  });
};

/**
 * create evaluation scheme
 * @param {*} req
 * @param {*} res
 */
module.exports.createEvaluation = (req, res) => {
  const evaluation = new EvaluationScheme(req.body);
  evaluation.save((err, evaluation) => {
    if (err) {
      console.log(err);
      console.log(req.body);

      return res.status(400).json({
        error: "name should be at least 3 char and unique",
      });
    }
    res.status(201).json({ message: "created successfully" });
  });
};

/**
 * Evaluation scheme listing all
 */
module.exports.getAllEvaluations = async (req, res) => {
  try {
    let { query, options } = getPaginationOptions(req);
    let response = await EvaluationScheme.paginate(query, options);
    return res.send(response);
  } catch (err) {
    return res.status(422).send({ messaeg: err.message });
  }
};

/**
 * get evaluation
 * @param {*} req
 * @param {*} res
 * @returns
 */
module.exports.getEvaluation = (req, res) => {
  return res.json(req.evaluation);
};

/**
 * update evaluation scheme
 * @param {} req
 * @param {*} res
 */
module.exports.updateEvaluation = (req, res) => {
  EvaluationScheme.findByIdAndUpdate(
    { _id: req.evaluation._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, evaluation) => {
      if (err) {
        return res.status(400).json({
          err: "name should be at least 3 char and unique",
        });
      }

      res.json(evaluation);
    }
  );
};

/**
 * delete evaluation scheme
 * @param {*} req
 * @param {*} res
 */
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
