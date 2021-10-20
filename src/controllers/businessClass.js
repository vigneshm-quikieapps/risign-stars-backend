const { BusinessClass, Member } = require("../models");
const { getQuery, getOptions } = require("../helpers/query");

//parameter extractor
module.exports.getBusinessClassIdById = (req, res, next, id) => {
  BusinessClass.findById(id)
    .populate("sessionIds")
    .exec((err, Class) => {
      if (err) {
        return res.status(400).json({
          err: "cannot find business Class by id enter a valid ID",
        });
      }
      req.Class = Class;
      next();
    });
};

//Business Class creation

module.exports.createBusinessClass = (req, res) => {
  const Class = new BusinessClass(req.body);
  Class.save((err, Class) => {
    if (err) {
      console.log(err);
      console.log(req.body);

      return res.status(400).json({
        error: "unable to save Business Class to database",
      });
    }
    res.json(Class);
  });
};

//Business Class listing all / search for Class
module.exports.getAllBusinessClass = async (req, res) => {
  try {
    let { businessId } = req.params;

    let query = getQuery(req);
    query = { ...query, businessId };
    let options = getOptions(req);

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
    let query = getQuery(req);
    query = { ...query, businessId: { $in: businessIds } };
    let options = getOptions(req);

    let response = await BusinessClass.paginate(query, options);
    return res.send(response);
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};

//Business Class listing
module.exports.getBusinessClass = (req, res) => {
  return res.json(req.Class);
};

//Business Class Update

module.exports.updateBusinessClass = (req, res) => {
  BusinessClass.findByIdAndUpdate(
    { _id: req.Class._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, Class) => {
      if (err) {
        return res.status(400).json({
          err: "sorry Business Class Not Updated ",
        });
      }

      res.json(Class);
    }
  );
};
//middleware for resticting deletion if session is present
module.exports.isBusinessClassRestricted = (req, res, next) => {
  let Class = req.Class;
  if (!Class) {
    return res.status(400).json({
      err: "Please Enter A valid Bussiness ID ",
    });
  }
  if (Class.session) {
    return res.status(400).json({
      err: "Class deletion is Restricted as there are active Sessions Present ",
    });
  }

  next();
};

module.exports.deleteBusinessClass = (req, res) => {
  const Class = req.Class;
  Class.remove((err, Class) => {
    if (err) {
      return res.status(400).json({
        err: "unable to delete Business Class",
      });
    }
    res.json(Class);
  });
};

module.exports.getAllMembersInAClass = async (req, res) => {
  try {
    let { classId } = req.params;

    let query = getQuery(req);
    query = { ...query, classId };
    let options = getOptions(req);

    let response = await Member.paginate(query, options);
    return res.send(response);
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};
