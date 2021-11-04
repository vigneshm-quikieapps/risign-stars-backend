const { BusinessFinance } = require("../models");
const { STARTS_WITH_FILTER, EQUALS_FILTER } = require("../constants/constant");
const { Types } = require("mongoose");

//parameter extractor
module.exports.getBusinessFinanceIdById = (req, res, next, id) => {
  BusinessFinance.findById(id).exec((err, businessFinance) => {
    if (err) {
      return res.status(400).json({
        error: "BusinessFinance not found",
      });
    }
    req.businessFinance = businessFinance;
    next();
  });
};

//create businessFinance

module.exports.createBusinessFinance = (req, res) => {
  const businessFinance = new BusinessFinance(req.body);
  businessFinance.save((err, businessFinance) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(businessFinance);
  });
};

module.exports.getBusinessFinance = (req, res) => {
  return res.json(req.businessFinance);
};

//get finance of a business
module.exports.getFinanceOfABusiness = async (req, res) => {
  try {
    let { businessId } = req.params;
    let businessFinance = await BusinessFinance.find({
      businessId: Types.ObjectId(businessId),
    });

    if (!businessFinance) {
      throw new Error("Does not exists");
    }

    return res.send({ businessFinance });
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};

// delete businessFinance
module.exports.deleteBusinessFinance = (req, res) => {
  let businessFinance = req.businessFinance;
  businessFinance.remove((err, businessFinance) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete the BusinessFinance",
      });
    }
    res.json({
      message: "businessFinance Deletion was a success",
      businessFinance,
    });
  });
};

module.exports.updateBusinessFinance = (req, res) => {
  BusinessFinance.findByIdAndUpdate(
    { _id: req.businessFinance._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, businessFinance) => {
      if (err) {
        return res.status(400).json({
          err: "BusinessFinance updation failed ",
        });
      }

      res.json(businessFinance);
    }
  );
};
module.exports.addDiscountToBusinessFinance = (req, res) => {
  BusinessFinance.findByIdAndUpdate(
    { _id: req.businessFinance._id },
    {
      $set: {
        discountSchemesId: req.body.discountSchemesId,
      },
    },
    { new: true, useFindAndModify: false },
    (err, businessFinance) => {
      if (err) {
        return res.status(400).json({
          err: "addDiscountToBusinessFinance updation failed ",
        });
      }

      res.json(businessFinance);
    }
  );
};

//all businessFinance listing

module.exports.getAllBusinessFinance = (req, res) => {
  //limit setter to export or send limited business to client or front end

  let limit = req.query.limit ? parseInt(req.query.limit) : 10;
  let page = req.query.page;

  let skip = page ? parseInt(page) - 1 * limit : 0;
  let sortBy = req.query.sortBy ? req.query.sortBy : "asc";

  /**
   * query object
   */
  let query = BusinessFinance.find()
    .sort({ _id: sortBy })
    .skip(skip)
    .limit(limit);

  /**
   * filter
   */
  let { filters = [] } = req.query;
  for (let { field, type, value } of filters) {
    switch (type) {
      case STARTS_WITH_FILTER:
        query.where(`${field}`, {
          $regex: new RegExp(`^${value}`, "i"),
        });
        break;
      case EQUALS_FILTER:
        query.where(`${field}`, value);
        break;
      default:
        break;
    }
  }

  /**
   * execute the query
   */
  query.exec((err, businessFinance) => {
    if (err) {
      return res.status(400).json({
        error: "NO BusinessFinance FOUND",
      });
    }
    res.json(businessFinance);
  });
};
