const BusinessSession = require("../models/businessSession");
const { getPaginationOptions } = require("../helpers/query");
const Enrolment = require("../models/Enrolment");

//Business Session creation
module.exports.createBusinessSession = async (req, res) => {
  try {
    let sessionPayload = { ...req.body };
    sessionPayload.businessId = req.classData.businessId;

    let businessSession = await BusinessSession.create(sessionPayload);
    businessSession = await BusinessSession.findById(
      businessSession._id
    ).populate({
      path: "coach",
      select: "name city",
    });

    return res
      .status(201)
      .send({ message: "create successful", businessSession });
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
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

module.exports.getBusinessSession = async (req, res) => {
  try {
    let { businessSessionId } = req.params;
    let businessSession = await BusinessSession.findById(businessSessionId);
    return res.send({ businessSession });
  } catch (err) {
    return res.send({ message: err.message });
  }
};

/**
 * update business session
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */

module.exports.updateBusinessSession = async (req, res) => {
  try {
    let { businessSessionId } = req.params;

    let businessSession = await BusinessSession.findByIdAndUpdate(
      { _id: businessSessionId },
      { $set: req.body },
      { new: true, useFindAndModify: false }
    );

    return res.send({ message: "update successful", businessSession });
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};

/**
 * delete a session
 * @param {*} req
 * @param {*} res
 * @returns
 */
module.exports.deleteBusinessSession = async (req, res) => {
  try {
    let sessionId = req.params.businessSessionId;
    let enrolmentCount = await Enrolment.count({ sessionId });

    if (enrolmentCount) {
      throw new Error("delete not allowed, session has atleast one enrolment");
    }

    await BusinessSession.deleteOne({ _id: sessionId });

    return res.send({ message: "delete successful" });
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
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
