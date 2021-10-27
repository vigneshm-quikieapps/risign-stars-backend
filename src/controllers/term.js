const { Term, BusinessSession } = require("../models");
const { getPaginationOptions } = require("../helpers/query");

//parameter extractor
// module.exports.getTermIdById = (req, res, next, id) => {
//   Term.findById(id)
//     .populate("business")
//     .exec((err, term) => {
//       if (err) {
//         return res.status(400).json({
//           err: "cannot find  Term by id",
//         });
//       }
//       req.term = term;
//       next();
//     });
// };

//Business Class creation

module.exports.createTerm = async (req, res) => {
  try {
    let term = await Term.create(req.body);
    return res.status(201).send({ message: "create successful", term });
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};

/**
 * get all terms
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
module.exports.getAllTerm = async (req, res) => {
  try {
    let { query, options } = getPaginationOptions(req);
    options.populate = { path: "business" };

    let response = await Term.paginate(query, options);
    return res.send(response);
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};

/**
 * get term
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
module.exports.getTerm = async (req, res) => {
  try {
    let termId = req.body.TermId;
    let term = await Term.findById(termId);
    return res.send({ term });
  } catch (err) {
    return res.status().send({ message: err.message });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
module.exports.updateTerm = async (req, res) => {
  try {
    let { termId } = req.params;

    let sessionCount = await BusinessSession.count({ "term._id": termId });

    if (sessionCount) {
      throw new Error("not allowed, there is atleast 1 session using the term");
    }

    await Term.findByIdAndUpdate(
      { _id: termId },
      { $set: req.body },
      { new: true, useFindAndModify: false }
    );

    return res.send({ message: "update successful" });
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
module.exports.deleteTerm = async (req, res) => {
  try {
    let { termId } = req.params;

    let sessionCount = await BusinessSession.count({ "term._id": termId });

    if (sessionCount) {
      throw new Error("not allowed, there is atleast 1 session using the term");
    }

    await Term.deleteOne({ _id: termId });
    return res.send({ message: "delete successful" });
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};

/**
 * get all terms in a business
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
module.exports.getAllTermsInABusiness = async (req, res) => {
  try {
    let { businessId } = req.params;

    let { query, options } = getPaginationOptions(req);
    query = { ...query, businessId };

    let response = await Term.paginate(query, options);
    return res.send(response);
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};
