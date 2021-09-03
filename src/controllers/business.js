const Business = require("../models/business");
const {  validationResult } = require("express-validator");
const { STARTS_WITH_FILTER, EQUALS_FILTER } = require("../contants/constant")




//parameter extractor

module.exports.getBusinessIdById = (req, res, next, id) => {
  Business.findById(id).exec((err, business) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found"
        });
      }
      req.business = business;
      next();
    });
};

//create business

module.exports.createBusiness = (req, res) => {
  const errors = validationResult(req);

     if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
      });
    }
    const business = new Business(req.body);
    business.save((err,business)=>{
        if (err) {
               return res.status(400).json({
                error: "unable to save evaluation to database"
            });
        }
        res.json(business);
    })
};

//get Business
module.exports.getBusiness = (req, res) => {
  
  return res.json(req.business);
};


// delete controllers
module.exports.deleteBusiness = (req, res) => {
  let business = req.business;
  business.remove((err, deletedBusiness) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete the product"
      });
    }
    res.json({
      message: "Deletion was a success",
      deletedBusiness
    });
  });
};



module.exports.updateBusiness = (req, res) => {
   const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
      error: errors.array()[0].msg
      });
     }

    Business.findByIdAndUpdate(
        { _id:req.business._id},
        {$set : req.body},
        {new : true ,useFindAndModify:false},
        (err,business)=>{
            if(err){
                return res.status(400).json({
                    err:"updation failed "
                });
            }
            
            res.json(business)
        }
    )
};

//all Business listing

module.exports.getAllBusinesses = (req, res) => {
  //limit setter to export or send limited business to client or front end

  let limit = req.query.limit ? parseInt(req.query.limit) : 10;
  let page = req.query.page;
  let skip = page ? (parseInt(page) - 1 * limit) : 0
  let sortBy = req.query.sortBy ? req.query.sortBy : "asc";

  /**
   * query object
   */
  let query = Business.find()
    .sort({_id: sortBy})
    .skip(skip)
    .limit(limit)

  /**
   * filter
   */
  let { filters = [] } = req.query
  for (let { field, type, value } of filters) {
    switch(type) {
      case STARTS_WITH_FILTER:
        query.where(`${field}`, {$regex : new RegExp(`^${value}`, "i")})
        break
      case EQUALS_FILTER:
        query.where(`${field}`, value)
        break
    default:
      break
    }
  }

  /**
   * execute the query
   */
  query.exec((err, businesses) => {
      if (err) {
        return res.status(400).json({
          error: "NO product FOUND"
        });
      }
      res.json(businesses);
    });
};
