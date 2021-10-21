const { Types } = require("mongoose");
const { getQuery, getOptions } = require("../helpers/query");
const { Term } = require("../models");

//parameter extractor
module.exports.getTermIdById = (req, res, next, id) => {
  Term.findById(id)
    .populate("business")
    .exec((err, term) => {
      if (err) {
        return res.status(400).json({
          err: "cannot find  Term by id",
        });
      }
      req.term = term;
      next();
    });
};

//Business Class creation

module.exports.createTerm = (req, res) => {
  const term = new Term(req.body);
  term.save((err, term) => {
    if (err) {
      return res.status(400).json({
        error: "unable to save Term to database",
        err,
      });
    }
    res.json(term);
  });
};

//Business Class listing all

module.exports.getAllTerm = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : "";
  let page = req.query.page;
  let skip = page ? parseInt(page) - 1 * limit : "";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Term.find()
    .populate("business")
    .sort([[sortBy, "asc"]])
    .skip(skip)
    .limit(limit)
    .exec((err, term) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          err: "cannot find Terms",
        });
      }
      res.json(term);
    });
};

//Term  listing

module.exports.getTerm = (req, res) => {
  return res.json(req.term);
};

//Term  Update

module.exports.updateTerm = (req, res) => {
  Term.findByIdAndUpdate(
    { _id: req.term._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, term) => {
      if (err) {
        return res.status(400).json({
          err: "sorry  Term Not Updated ",
        });
      }

      res.json(term);
    }
  );
};

//Term  delete

module.exports.deleteTerm = (req, res) => {
  const term = req.term;
  term.remove((err, term) => {
    if (err) {
      return res.status(400).json({
        err: "unable to delete  Term",
      });
    }
    res.json(term);
  });
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

    let query = getQuery(req);
    query = { ...query, businessId };
    let options = getOptions(req);

    let response = await Term.paginate(query, options);
    return res.send(response);
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};
