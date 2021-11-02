const Discounts = require("../models/discounts");
const { STARTS_WITH_FILTER, EQUALS_FILTER } = require("../constants/constant");
const mongoose = require("mongoose");
const { Enrolment, Bill } = require("../models");
const { ObjectId } = require("mongoose").Types;

//discount api's are listed below

//parameter extractor
// module.exports.getdiscountIdById = (req, res, next, id) => {
//   Discounts.findById(id).exec((err, discount) => {
//     if (err) {
//       return res.status(400).json({
//         error: "discounts not found",
//       });
//     }
//     req.discount = discount;
//     next();
//   });
// };
//create Discounts

const discountAllFutureCharges = async (data, session) => {
  let { memberId, classId } = data;
  let discountData = data.discount;

  let now = new Date();

  /**
   * discount all future bills
   */
  let condition = {
    memberId,
    classId,
    billDate: { $gt: now },
  };

  let bills = await Bill.find(condition);

  let updatePayload = bills.map((bill) => {
    let discount = bill.total * (discountData.value / 100);
    let total = bill.subtotal - discount;
    return {
      updateOne: {
        filter: { _id: ObjectId(bill._id) },
        update: {
          $set: {
            discount,
            total,
          },
        },
      },
    };
  });
  await Bill.bulkWrite(updatePayload, { session });
};

module.exports.applyDiscount = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    let { enrolmentId } = req.body;
    let { discountData, enrolmentData } = req;
    let { classId, memberId } = enrolmentData;

    let update = {
      $set: {
        discountDetail: {
          name: discountData.name,
          value: discountData.value,
          type: discountData.type,
        },
      },
    };

    let options = {
      new: true,
    };
    await Enrolment.findByIdAndUpdate(enrolmentId, update, options).session(
      session
    );

    /**
     * update all future charges with discount
     */
    let data = { classId, memberId, discount: discountData };
    await discountAllFutureCharges(data, session);
    session.commitTransaction();

    return res.send({ message: "applied successful" });
  } catch (err) {
    session.abortTransaction();
    return res.status(422).send({ message: err.message });
  }
};

module.exports.createDiscounts = (req, res) => {
  const discounts = new Discounts(req.body);
  discounts.save((err, discount) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(discount);
  });
};

module.exports.getAllDiscountInABusiness = async (req, res) => {
  try {
    let { businessId } = req.params;
    let discounts = await Discounts.find({ businessId });
    return res.send({ discounts });
  } catch (err) {
    return res.send({ message: err.message });
  }
};

//get discount by businessId
module.exports.getDiscounts = (req, res) => {
  Discounts.findOne({ businessId: req.params.businessId }, (err, discount) => {
    if (err) {
      return res.status(400).json({
        err: "Discountnot found!!   ",
      });
    }

    res.json(discount);
  });
};

// delete  discount by businessId
module.exports.deleteDiscounts = (req, res) => {
  let discounts = req.discount;
  discounts.remove((err, discount) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete the Discounts",
      });
    }
    res.json({
      message: "Discounts Deletion was a success",
      discount,
    });
  });
};

//all getAllDiscounts listing

module.exports.getAllDiscounts = (req, res) => {
  //limit setter to export or send limited business to client or front end

  let limit = req.query.limit ? parseInt(req.query.limit) : 10;
  let page = req.query.page;

  let skip = page ? parseInt(page) - 1 * limit : 0;
  let sortBy = req.query.sortBy ? req.query.sortBy : "asc";

  /**
   * query object
   */
  let query = Discounts.find().sort({ _id: sortBy }).skip(skip).limit(limit);

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
  query.exec((err, discount) => {
    if (err) {
      return res.status(400).json({
        error: "NO Discounts FOUND",
      });
    }
    res.json(discount);
  });
};

module.exports.addNewDiscountScheme = (req, res) => {
  let discounts = [];
  req.body.discountSchemes.forEach((discount) => {
    discounts.push({
      name: discount.name,
      type: discount.type,
      value: discount.value,
    });
  });
  //store thi in DB
  Discounts.findByIdAndUpdate(
    { _id: req.discount._id },
    { $push: { discountSchemes: discounts } },
    { new: true },
    (err, discount) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to add discount list ",
        });
      }
      return res.status(200).json({
        error: " add discount list success ",
        discount,
      });
    }
  );
};

module.exports.deleteDiscountScheme = (req, res) => {
  Discounts.findOneAndUpdate(
    {
      _id: req.discount._id,
    },
    {
      $pull: {
        discountSchemes: { _id: req.params.discountSchemesId },
      },
    },
    { new: true, useFindAndModify: false },
    (err, discount) => {
      if (err) {
        return res.status(400).json({
          err: "Discounts updation failed ",
        });
      }

      res.json(discount);
    }
  );
};

module.exports.updateDiscountsScheme = (req, res) => {
  Discounts.findOneAndUpdate(
    {
      _id: req.discount._id,
      "discountSchemes._id": req.params.discountSchemesId,
    },
    {
      $set: {
        "discountSchemes.$.name": req.body.name,
        "discountSchemes.$.type": req.body.type,
        "discountSchemes.$.value": req.body.value,
      },
    },
    { new: true, useFindAndModify: false },
    (err, discount) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          err: "Discounts updation failed ",
        });
      }

      res.json(discount);
    }
  );
};
module.exports.updateStatusOfDiscountsScheme = (req, res) => {
  Discounts.findOneAndUpdate(
    {
      _id: req.discount._id,
      "discountSchemes._id": req.params.discountSchemesId,
    },
    {
      $set: {
        "discountSchemes.$.status": req.body.status,
      },
    },
    { new: true, useFindAndModify: false },
    (err, discount) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          err: "Discounts status updation failed ",
        });
      }

      res.json(discount);
    }
  );
};
