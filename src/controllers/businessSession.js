const BusinessSession = require("../models/businessSession");
const { getPaginationOptions } = require("../helpers/query");
const Enrolment = require("../models/Enrolment");
const { Types } = require("mongoose");

//parameter extractor
module.exports.getBusinessSessionIdById = (req, res, next, id) => {
  BusinessSession.findById(id).exec((err, Session) => {
    if (err) {
      return res.status(400).json({
        err: "cannot find business Session by id",
      });
    }
    req.businessSession = Session;
    next();
  });
};

//Business Session creation
module.exports.createBusinessSession = (req, res) => {
  const Session = new BusinessSession(req.body);
  Session.save((err, Session) => {
    if (err) {
      console.log(err);
      console.log(req.body);

      return res.status(400).json({
        error: "unable to save Business Session to database",
      });
    }
    res.json(Session);
  });
};

//Business Session listing all /search for Class
module.exports.getAllBusinessSession = async (req, res) => {
  try {
    let { classId } = req.params;

    let { query, options } = getPaginationOptions(req);
    options.populate = { path: "coach", select: ["name", "city"] };
    query = { ...query, classId };

    let response = await BusinessSession.paginate(query, options);
    return res.send(response);
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};

//Business Session listing

module.exports.getBusinessSession = (req, res) => {
  return res.json(req.businessSession);
};

//Business Session Update

module.exports.updateBusinessSession = (req, res) => {
  BusinessSession.findByIdAndUpdate(
    { _id: req.businessSession._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, Session) => {
      if (err) {
        return res.status(400).json({
          err: "sorry Business activityClass Not Updated ",
        });
      }

      res.json(Session);
    }
  );
};

//Business Session delete

module.exports.deleteBusinessSession = (req, res) => {
  const Session = req.businessSession;
  Session.remove((err, Session) => {
    if (err) {
      return res.status(400).json({
        err: "unable to delete Business activityClass",
      });
    }
    res.json(Session);
  });
};

module.exports.getMembersInASession = async (req, res) => {
  try {
    let { query, options } = getPaginationOptions(req);
    options.populate = [
      { path: "memberConsent", select: ["consent"] },
      { path: "member", select: ["name"] },
    ];

    let response = await Enrolment.paginate(query, options);
    return res.send(response);
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};

/**
 * get all sessions in a term
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
module.exports.getAllSessionsInATerm = async (req, res) => {
  try {
    let { termId } = req.params;

    let { query, options } = getPaginationOptions(req);
    query = { query, "term._id": termId };
    options.populate = { path: "coach", select: ["name", "city"] };

    let response = await BusinessSession.paginate(query, options);
    return res.send(response);
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};

/**
 * get all sessions in a class (of a particular term)
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
module.exports.getSessionsInAClassOfAParticularTerm = async (req, res) => {
  try {
    let { termId, classId } = req.body;

    let { query, options } = getPaginationOptions(req);
    query = { ...query, "term._id": termId, classId };

    let response = await BusinessSession.paginate(query, options);
    return res.send(response);
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};
