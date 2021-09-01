const formidable = require("formidable");
const Business = require("../models/business");
const _ = require("lodash");
const business = require("../models/business");



//parameter extractor

exports.getBusinessIdById = (req, res, next, id) => {
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

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image"
      });
    }
    //destructure the fields
    const { name, code,tradename,  type, about,address } = fields;

    if (!name || !code || !tradename || !type || !about|| !address) {
      return res.status(400).json({
        error: "Please include all fields"
      });
    }

    let business = new Business(fields);

   
    

    //save to the DB
    business.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "Saving tshirt in DB failed"
        });
      }
      res.json(business);
    });
  });
};

//get Business
exports.getBusiness = (req, res) => {
  
  return res.json(req.business);
};


// delete controllers
exports.deleteBusiness = (req, res) => {
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



exports.updateBusiness = (req, res) => {
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

exports.getAllBusiness = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : "";
  //limit setter to export or send limited business to client or front end
  //let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Business.find()
    .sort([[sortBy, "asc"]])
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
