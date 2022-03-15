const { Term, BusinessSession, Enrolment } = require("../models");
const { getPaginationOptions } = require("../helpers/query");
const { ObjectId } = require("mongoose").Types;
const { auditCreatedBy } = require("../helpers/audit");

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
    let payload = { ...req.body };
    payload = auditCreatedBy(req, payload);
    let term = await Term.create(payload);
    return res.status(201).send({ message: "Create successful.", term });
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

    // let sessionCount = await BusinessSession.count({ "term._id": termId });

    // if (sessionCount) {
    //   throw new Error(
    //     "not allowed, there is at least 1 session using the term"
    //   );
    // }

    let sessions = await BusinessSession.find({ "term._id": termId });

    if (sessions.length == 0) {
      let sessionIds = sessions.map((sessionData) => ObjectId(sessionData._id));

      let enrolments = await Enrolment.find({ sessionId: { $in: sessionIds } });

      if (enrolments.length == 0) {
        let term = await Term.findByIdAndUpdate(
          { _id: termId },
          { $set: req.body },
          { new: true, useFindAndModify: false }
        );

        return res.send({ message: "Update successful.", term });
      } else {
        // return res.send({
        //   message: "not allowed, members are already enrolled in this term",
        // });
        throw new Error(
          "Not allowed, Members are already Enrolled in this Term."
        );
      }
    } else {
      // return res.send({
      //   message: "not allowed, there is at least 1 session using the term",
      // });
      throw new Error(
        "Not allowed, there is at least one Session using the Term."
      );
    }
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
      throw new Error(
        "Not allowed, there is atl east one Session using the Term."
      );
    }

    await Term.deleteOne({ _id: termId });
    return res.send({ message: "Delete successful." });
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

module.exports.getAllTermsInAClass = async (req, res) => {
  try {
    let { classId } = req.params;

    let sessions = await BusinessSession.aggregate([
      {
        $match: {
          classId: ObjectId(classId),
        },
      },
      {
        $group: {
          _id: "$term._id",
        },
      },
    ]);

    /**
     * TODO. move the map code to database query
     */
    let termIds = sessions.map((session) => session._id);
    let terms = await Term.find({ _id: { $in: termIds } });

    return res.send({ terms });
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};
