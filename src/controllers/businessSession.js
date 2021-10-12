const BusinessSession = require("../models/businessSession");

const { STARTS_WITH_FILTER, EQUALS_FILTER } = require("../constants/constant");
const { getQuery, getOptions } = require("../helpers/query");

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

    let query = getQuery(req);
    let options = getOptions(req);
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
