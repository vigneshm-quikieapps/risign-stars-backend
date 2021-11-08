const {
  BusinessClass,
  Member,
  BusinessSession,
  Enrolment,
  Business,
} = require("../models");
const { getPaginationOptions } = require("../helpers/query");
const mongoose = require("mongoose");

//parameter extractor
// module.exports.getBusinessClassIdById = (req, res, next, id) => {
//   BusinessClass.findById(id)
//     .populate("business")
//     .populate("sessions")
//     .exec((err, Class) => {
//       if (err) {
//         return res.status(400).json({
//           err: "should be a valid class id",
//         });
//       }
//       req.Class = Class;
//       next();
//     });
// };

/**
 * create class
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
module.exports.createBusinessClass = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    let { sessions, businessId } = req.body;
    const businessClasses = await BusinessClass.create([req.body], { session });
    let businessClass = businessClasses[0];

    let classId = businessClass._id;

    let sessionsPayload = sessions.map((sessionData) => {
      return {
        ...sessionData,
        businessId,
        classId,
      };
    });

    await BusinessSession.create(sessionsPayload, { session });

    await session.commitTransaction();
    return res.send({ message: "created successful", businessClass });
  } catch (err) {
    await session.abortTransaction();
    console.error(err);
    return res.status(422).send({ message: err.message });
  } finally {
    session.endSession();
  }
};

//Business Class listing all / search for Class
module.exports.getAllBusinessClass = async (req, res) => {
  try {
    let { businessId } = req.params;

    let { query, options } = getPaginationOptions(req);
    query = { ...query, businessId };

    let response = await BusinessClass.paginate(query, options);
    return res.send(response);
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};

/**
 * get all classes for the logged in business admin
 * @param {*} req
 * @param {*} res
 * @returns
 */
module.exports.getAllClassesForALoggedInBusinessAdmin = async (req, res) => {
  try {
    let { authUserData } = req;

    /**
     * get the business ids
     */
    let { dataPrivileges } = authUserData;
    let businessIds = dataPrivileges.map((dataPriv) => dataPriv.businessId);

    /**
     * filter classes by business ids
     */
    let { query, options } = getPaginationOptions(req);
    query = { ...query };

    if (query.businessId) {
      /**
       * if business id is sent in query params,
       * if the business id doesn't belong to the auth user,
       * throw an error
       */
      if (!businessIds.includes(query.businessId)) {
        throw new Error("does not have permisssion");
      }
    } else {
      /**
       * query all the classes of the businesses the user has permission
       */
      query = { ...query, businessId: { $in: businessIds } };
    }

    let response = await BusinessClass.paginate(query, options);
    return res.send(response);
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};

/**
 * get business class by id
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
module.exports.getBusinessClass = async (req, res) => {
  try {
    let { businessClassId } = req.params;
    let businessClass = await BusinessClass.findById(businessClassId)
      .populate("business")
      .populate("sessions");

    return res.send({ businessClass });
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};

/**
 * update class
 * @param {*} req
 * @param {*} res
 */
module.exports.updateBusinessClass = async (req, res) => {
  try {
    let { businessClassId } = req.params;
    let businessClass = await BusinessClass.findByIdAndUpdate(
      { _id: businessClassId },
      { $set: req.body },
      { new: true, useFindAndModify: false }
    );

    return res.send({ message: "update successful", businessClass });
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};

//middleware for resticting deletion if session is present
module.exports.isBusinessClassRestricted = (req, res, next) => {
  let Class = req.Class;
  if (!Class) {
    return res.status(400).json({
      err: "should be a valid class id",
    });
  }

  next();
};

module.exports.deleteBusinessClass = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    let classId = req.params.businessClassId;

    let businessClass = await BusinessClass.findById(classId);

    if (!businessClass) {
      throw new Error("invalid class id");
    }

    let enrolmentCount = await Enrolment.count({
      classId,
    });

    if (enrolmentCount) {
      throw new Error(
        "delete not allowed, there is atlest one enrolment in the class"
      );
    }

    await BusinessSession.deleteMany({ classId }, { session });
    await BusinessClass.deleteOne({ _id: classId }, { session });

    await session.commitTransaction();

    return res.send({ message: "delete successful" });
  } catch (err) {
    return res.status(422).send({ message: err.message });
  } finally {
    session.endSession();
  }
};

module.exports.getAllMembersInAClass = async (req, res) => {
  try {
    let { classId } = req.params;

    let { query, options } = getPaginationOptions(req);
    query = { ...query, classId };

    let response = await Member.paginate(query, options);
    return res.send(response);
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};
