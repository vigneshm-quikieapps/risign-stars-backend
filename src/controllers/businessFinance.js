const { BusinessFinance } = require("../models");
const { STARTS_WITH_FILTER, EQUALS_FILTER } = require("../constants/constant");
const { Types } = require("mongoose");
const mongoose = require("mongoose");
const Discounts = require("../models/discounts");

//parameter extractor
// module.exports.getBusinessFinanceIdById = (req, res, next, id) => {
//   BusinessFinance.findById(id).exec((err, businessFinance) => {
//     if (err) {
//       return res.status(400).json({
//         error: "BusinessFinance not found",
//       });
//     }
//     req.businessFinance = businessFinance;
//     next();
//   });
// };

//create businessFinance

module.exports.createBusinessFinance = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    let { businessId } = req.body;
    let data = { ...req.body };
    let { discountSchemes } = data;
    const businessFinances = await BusinessFinance.create([data], { session });
    let businessFinance = businessFinances[0];

    let discountSchemesPayload = discountSchemes.map((discountScheme) => ({
      ...discountScheme,
      businessId,
    }));

    await Discounts.create(discountSchemesPayload, { session });

    await session.commitTransaction();

    return res
      .status(201)
      .send({ message: "create successful", businessFinance });
  } catch (err) {
    await session.abortTransaction();
    console.error(err);
    return res.status(422).send({ message: err.message });
  } finally {
    session.endSession();
  }
};

/**
 * get business finance by id
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
module.exports.getBusinessFinance = async (req, res) => {
  try {
    let { businessFinanceId } = req.params;
    let businessFinance = await BusinessFinance.findById(businessFinanceId);
    return res.send({ businessFinance });
  } catch (err) {
    return res.send({ message: err.message });
  }
};

/**
 * get finance of a business
 * @param {*} req
 * @param {*} res
 * @returns
 */
module.exports.getFinanceOfABusiness = async (req, res) => {
  try {
    let { businessId } = req.params;
    let businessFinance = await BusinessFinance.findOne({
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
module.exports.deleteBusinessFinance = async (req, res) => {
  try {
    let { businessFinanceId } = req.params;
    await BusinessFinance.deleteOne({ _id: businessFinanceId });
    return res.send({ message: "delete successful" });
  } catch (err) {
    return res.send({ message: err.message });
  }
};

/**
 * update finance of business
 * @param {*} req
 * @param {*} res
 * @returns
 */
module.exports.updateBusinessFinance = async (req, res) => {
  try {
    let { businessFinanceId } = req.params;
    let updatePayload = { ...req.body };

    /**
     * don't allow
     * 1. updating charges and
     * 2. discountSchemes
     * from this API
     * update charges will be in separate API
     */
    delete updatePayload.discountSchemes;
    delete updatePayload.charges;

    let businessFinance = await BusinessFinance.findByIdAndUpdate(
      { _id: businessFinanceId },
      { $set: updatePayload },
      { new: true, useFindAndModify: false }
    );

    return res.send({ message: "update successful", businessFinance });
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};

/**
 * add discount to business finance
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
module.exports.addDiscountToBusinessFinance = async (req, res) => {
  try {
    let { businessFinanceId } = req.params;
    let businessFinance = await BusinessFinance.findByIdAndUpdate(
      { _id: businessFinanceId },
      {
        $set: {
          discountSchemesId: req.body.discountSchemesId,
        },
      }
    );

    return res.send({ message: "discount added successful", businessFinance });
  } catch (err) {
    return res.send({ message: err.message });
  }
};

/**
 * get all business finance
 * @param {*} req
 * @param {*} res
 */
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
