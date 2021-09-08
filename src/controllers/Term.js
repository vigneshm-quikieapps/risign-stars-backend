const Term = require("../models/Term");

//const { validationResult } = require("express-validator");

//parameter extractor
module.exports.getTermIdById = (req, res, next, id) => {
    BusinessClass.findById(id)
    .populate("business")
    .exec((err, Term) => {
    if (err) {
      return res.status(400).json({
        err: "cannot find  Term by id",
      });
    }
    req.Term = Term;
    next();
  });
};

//Business Class creation

module.exports.createTerm = (req, res) => {
  
  const Term = new Term(req.body);
   Term.save((err, Term) => {
    if (err) {
      console.log(err);
      console.log(req.body);

      return res.status(400).json({
        error: "unable to save Term to database",
      });
    }
    res.json(Term);
  });
};

//Business Class listing all

module.exports.getAllTerm= (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : "";
  let page = req.query.page;
  let skip = page ? parseInt(page) - 1 * limit : "";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

    Term.find()
    .populate("business")
    .sort([[sortBy, "asc"]])
    .skip(skip)
    .limit(limit)
    .exec((err, Term) => {
      if (err) {
        return res.status(400).json({
          err: "cannot find Terms",
        });
      }
      res.json(Term);
    });
};

//Term  listing

module.exports.getTerm = (req, res) => {
  return res.json(req.Term);
};

//Term  Update

module.exports.updateTerm = (req, res) => {
  

  Term.findByIdAndUpdate(
    { _id: req.Term._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, Term) => {
      if (err) {
        return res.status(400).json({
          err: "sorry  Term Not Updated ",
        });
      }

      res.json(Term);
    }
  );
};

//Term  delete

module.exports.deleteTerm = (req, res) => {
  const Term = req.Term;
  Term.remove((err, Term) => {
    if (err) {
      return res.status(400).json({
        err: "unable to delete  Term",
      });
    }
    res.json(Term);
  });
};
