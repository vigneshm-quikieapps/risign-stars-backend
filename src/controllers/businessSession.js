const { getPaginationOptions } = require("../helpers/query");
const { Enrolment, BusinessSession, Term } = require("../models");
const { auditCreatedBy, auditUpdatedBy } = require("../helpers/audit");
const moment = require("moment");

//Business Session creation
module.exports.createBusinessSession = async (req, res) => {
  try {
    const { startTime, endTime, pattern } = req.body;
    const updatedPattern = pattern.map((day) => ({ day, startTime, endTime }));
    req.body.pattern = updatedPattern;

    let sessionPayload = { ...req.body };
    sessionPayload = auditCreatedBy(req, sessionPayload);
    sessionPayload.businessId = req.classData.businessId;

    let businessSession = await BusinessSession.create({
      ...sessionPayload,
      status: "OPEN_FOR_ENROLMENT",
    });
    businessSession = await BusinessSession.findById(businessSession._id)
      .populate({
        path: "coach",
        select: "name city",
      })
      .populate("termData");

    return res
      .status(201)
      .send({ message: "Create successful.", businessSession });
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};

//Business Session listing all /search for Class
module.exports.getAllBusinessSession = async (req, res) => {
  try {
    let { classId } = req.params;

    let { query, options } = getPaginationOptions(req);
    options.populate = [
      { path: "coach", select: ["name", "city"] },
      { path: "termData" },
    ];
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
    let businessSession = await BusinessSession.findById(
      businessSessionId
    ).populate("termData", "coachId");

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

    const { startTime, endTime, pattern, startDate, endDate } = req.body;
    const updatedPattern = pattern.map((day) => ({ day, startTime, endTime }));
    req.body.pattern = updatedPattern;

    let businessSession = await BusinessSession.findById(businessSessionId);

    let enrolmentCount = await Enrolment.count({
      sessionId: businessSessionId,
    });

    if (
      enrolmentCount &&
      (!moment(startDate).isSame(businessSession.startDate) ||
        !moment(endDate).isSame(businessSession.endDate))
    ) {
      throw new Error(
        "StartDate / EndDate update is not allowed, Session has at least one Enrolment."
      );
    }

    const term = await Term.findById(req.body.term._id);
    businessSession = await BusinessSession.findByIdAndUpdate(
      { _id: businessSessionId },
      { $set: { ...req.body, term, updatedBy: auditUpdatedBy(req) } },
      { new: true, useFindAndModify: false }
    ).populate("termData");

    return res.send({ message: "Update successful.", businessSession });
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
      throw new Error("Delete not allowed, Session has atleast one Erolment.");
    }

    await BusinessSession.deleteOne({ _id: sessionId });

    return res.send({ message: "Delete successful." });
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};

module.exports.getMembersInASession = async (req, res) => {
  try {
    let { businessSessionId } = req.params;

    let { query, options } = getPaginationOptions(req);
    query = { ...query, sessionId: businessSessionId };
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
    options.populate = [
      { path: "coach", select: ["name", "city"] },
      { path: "termData" },
    ];

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
    options.populate = [
      { path: "coach", select: ["name", "city"] },
      { path: "termData" },
    ];

    let response = await BusinessSession.paginate(query, options);
    return res.send(response);
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};
