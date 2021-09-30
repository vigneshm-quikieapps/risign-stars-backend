const BusinessFinance = require("../models/businessFinance");

const { STARTS_WITH_FILTER, EQUALS_FILTER } = require("../contants/constant");

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

//get businessFinance
module.exports.getBusinessFinance = (req, res) => {
  return res.json(req.businessFinance);
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
  console.log(discounts, req.businessFinance._id);
  BusinessFinance.findOneAndUpdate(
    { _id: req.businessFinance._id },
    { $push: { discountSchemes: discounts } },
    { new: true },
    (err, discount) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to save discount list ",
        });
      }
      return res.json(discount);
    }
  );
};
//
// {
//   "_id": ObjectId("59b7e839200a5c00ee2d2851"),
//   "player": "New",
//   "playesList": [
//     {
//       "_id": ObjectId("59b2a4f749fee40959e556d3"),
//       "name": "abcd",
//     },
//     {
//       "_id": ObjectId("59b2a4f749fee40959e556d4"),
//       "name": "pqrs",
//     }
//   ]
// }
// play.findOneAndUpdate({
//     "_id": "59b7e839200a5c00ee2d2851",
//     "playesList._id": "59b2a4f749fee40959e556d3"
// }, {
//     "$set": {
//         "playesList.$.name": "something"
//     }
// }, function(error, success) {}
//)
