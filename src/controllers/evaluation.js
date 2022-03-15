const { EvaluationScheme } = require("../models");
const { getPaginationOptions } = require("../helpers/query");
const DoesNotExistError = require("../exceptions/DoesNotExistError");
const { auditCreatedBy } = require("../helpers/audit");

//parameter extractor
// module.exports.getEvaluationIdById = (req, res, next, id) => {
//   EvaluationScheme.findById(id).exec((err, evaluation) => {
//     if (err) {
//       return res.status(400).json({
//         err: "cannot find evaluation by id",
//       });
//     }
//     req.evaluation = evaluation;
//     next();
//   });
// };

/**
 * create evaluation scheme
 * @param {*} req
 * @param {*} res
 */
module.exports.createEvaluation = async (req, res) => {
  try {
    let payload = { ...req.body };
    payload = auditCreatedBy(req, payload);
    const evaluationScheme = await EvaluationScheme.create(payload);
    res
      .status(201)
      .json({ message: "Created successfully.", evaluationScheme });
  } catch (err) {
    return res.status().send({ message: err.message });
  }
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
module.exports.getEvaluation = async (req, res) => {
  try {
    let { evaluationSchemeId } = req.params;
    let evaluationScheme = await EvaluationScheme.findById(evaluationSchemeId);
    return res.send({ evaluationScheme });
  } catch (err) {
    return res.status(422).send({ messaeg: err.message });
  }
};

/**
 * update evaluation scheme
 * @param {} req
 * @param {*} res
 */
module.exports.updateEvaluation = async (req, res) => {
  try {
    let { evaluationSchemeId } = req.params;
    let evaluationScheme = await EvaluationScheme.findByIdAndUpdate(
      { _id: evaluationSchemeId },
      { $set: req.body },
      { new: true, useFindAndModify: false }
    );

    return res.send({ message: "Update successful.", evaluationScheme });
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};

/**
 * delete evaluation scheme
 * @param {*} req
 * @param {*} res
 */
module.exports.deleteEvaluation = async (req, res) => {
  try {
    let { evaluationSchemeId } = req.params;

    let evaluationScheme = await EvaluationScheme.deleteOne({
      _id: evaluationSchemeId,
    });

    if (!evaluationScheme) {
      throw new DoesNotExistError();
    }

    return res.send({ message: "Delete successful." });
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};
