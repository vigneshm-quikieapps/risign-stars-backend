const formidable = require("formidable");
const Business = require("../models/business");
const _ = require("lodash");

const {  validationResult } = require("express-validator");



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
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  

  form.parse(req, (err, fields) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image"
      });
    }
    //destructure the fields
   const { name, code,tradename,  type, about, postcode,line1 , city, country } = fields;
    
    if (!name || !code || !tradename || !type || !about ||!postcode ||!line1 || !city ||!country) {
      return res.status(400).json({
       error: "Please include all fields"
     });
    }
  
    let business = new Business(fields);

    //save to the DB
    business.save((err, business) => {
      if (err) {
        res.status(400).json({
          error: "Saving business in DB failed"
        });
      }
      res.json(business);
    });
  });
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
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image"
      });
    }

    //updation code
    let business = req.business;
    business = _.extend(business, fields);

   
   //save to the DB
    business.save((err, business) => {
      if (err) {
        res.status(400).json({
          error: "Updation of product failed"
        });
      }
      res.json(business);
    });
  });
};

//all Business listing

module.exports.getAllBusinesses = (req, res) => {

//limit setter to export or send limited business to client or front end

  let limit = req.query.limit ? parseInt(req.query.limit) : 10;
  let page = req.query.page;
  let skip = page ? (parseInt(page) - 1 * limit) : 0
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Business.find()
    .sort([[sortBy, "asc"]])
    .skip(skip)
    .limit(limit)
    .exec((err, businesses) => {
      if (err) {
        return res.status(400).json({
          error: "NO product FOUND"
        });
      }
      res.json(businesses);
    });
};
