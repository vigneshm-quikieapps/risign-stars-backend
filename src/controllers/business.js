const Business = require("../models/business");
const Bill = require("../models/Bill");
// const Member = require("../models/member");
const multer = require("multer");
const XLSX = require("xlsx");
const CSVToJSON = require("csvtojson");
const { STARTS_WITH_FILTER, EQUALS_FILTER } = require("../constants/constant");
const path = require("path");

//parameter extractor
module.exports.getBusinessIdById = (req, res, next, id) => {
  Business.findById(id).exec((err, business) => {
    if (err) {
      return res.status(400).json({
        error: "Product not found",
      });
    }
    req.business = business;
    next();
  });
};

//create business

module.exports.createBusiness = (req, res) => {
  const business = new Business(req.body);
  business.save((err, business) => {
    if (err) {
      console.error(err.message);
      return res.status(400).json({
        error: "unable to save evaluation to database",
      });
    }
    res.json(business);
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
        error: "Failed to delete the product",
      });
    }
    res.json({
      message: "Deletion was a success",
      deletedBusiness,
    });
  });
};

/**
 * updating business code is not allowed
 *
 * as business code determines the club membership id
 *
 * @param {*} req
 * @param {*} res
 */
module.exports.updateBusiness = (req, res) => {
  let data = { ...req.body };
  delete data.code; /** updating business is not allowed  */

  Business.findByIdAndUpdate(
    { _id: req.business._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, business) => {
      if (err) {
        return res.status(400).json({
          err: "updation failed ",
        });
      }

      res.json(business);
    }
  );
};

//all Business listing

module.exports.getAllBusinesses = (req, res) => {
  //limit setter to export or send limited business to client or front end

  let limit = req.query.limit ? parseInt(req.query.limit) : 10;
  let page = req.query.page;

  let skip = page ? parseInt(page) - 1 * limit : 0;
  let sortBy = req.query.sortBy ? req.query.sortBy : "asc";

  /**
   * query object
   */
  let query = Business.find().sort({ _id: sortBy }).skip(skip).limit(limit);

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
  query.exec((err, businesses) => {
    if (err) {
      return res.status(400).json({
        error: "NO product FOUND",
      });
    }
    res.json(businesses);
  });
};

// Uploading the CSV file
module.exports.uploadFile = (req, res) => {
  var upload = multer({
    dest: "./src/uploads/",
    fileFilter: function (req, file, cb) {
      cb(null, true);
    },
  }).single("csv");

  upload(req, res, function (err) {
    if (err) {
      console.log(err);
    }

    CSVToJSON()
      .fromFile(req.file.path)
      .then((users) => {
        console.log("====================================");
        console.log("temp", users);
        console.log("====================================");
      })
      .catch((err) => {
        console.log(err);
      });

    // var workbook = XLSX.readFile(req.file.path);
    // var sheet_name_list = workbook.SheetNames;
    // var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    //
    // const result = excelToJson({
    //   sourceFile: req.file.path,
    // });
  });
};

// Uploading the xlxs file
module.exports.uploadXLXSFile = (req, res) => {
  const filestorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./src/xlxs");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  const upload = multer({
    storage: filestorage,
    fileFilter: (req, file, cb) => {
      //console.log(file);
      if (path.extname(file.originalname) !== ".xlsx") {
        return res.send("file type not valid!!");
      }

      cb(null, true);
    },
  }).single("payment");
  upload(req, res, function (err) {
    if (err) {
      return res.json(err);
    }
    //**************************** */
    //console.log(req.body.classid);
    //console.log(req.file);
    var workbook = XLSX.readFile(`./src/xlxs/${req.file.originalname}`, {
      type: "binary",
      cellDates: true,
    });
    var sheet_name_list = workbook.SheetNames;
    //console.log(sheet_name_list); // getting as Sheet1
    let data = [];

    sheet_name_list.forEach(function (y) {
      var worksheet = workbook.Sheets[y];
      //getting the complete sheet
      // console.log(worksheet);

      var headers = {};
      for (var z in worksheet) {
        if (z[0] === "!") continue;
        //parse out the column, row, and value
        var col = z.substring(0, 1);
        // console.log(col);

        var row = parseInt(z.substring(1));
        // console.log(row);

        var value = worksheet[z].v;
        // console.log(value);

        //store header names
        if (row == 1) {
          headers[col] = value;
          // storing the header names
          continue;
        }

        if (!data[row]) data[row] = {};
        data[row][headers[col]] = value;
      }
      //drop those first two rows which are empty
      data.shift();
      data.shift();
      //console.log(data);
    });
    //*************************** */
    //************** */

    //console.log("one");
    const promise1 = new Promise((resolve) => {
      let Errors = [];
      //Errors.push("u are here");
      //console.log(Errors);
      let noDataFound = [];
      const classId = req.body.classid;
      data.forEach((bill, index) => {
        //console.log("two");
        Bill.findOne(
          {
            clubMembershipId: bill.Membershipnumber,
            classId: classId,
            billDate: req.body.BillDate,
          },
          (err, data) => {
            if (err) {
              Errors.push({
                line: index + 1,
                "err msg": "please enter valid fields to process payment",
                bill: bill,
              });
              //console.log(Errors);
            }
            if (!data) {
              //return res.status(400);
              noDataFound.push({
                line: index + 1,
                "err msg":
                  "no Bill Found for this Data please enter a valid data",
                bill: bill,
              });
              //console.log(noDataFound);
            }
          }
        );
        resolve([Errors, noDataFound]);
      });
    });
    promise1.then((value) => {
      //******************** */
      if (value[0].length !== 0 && value[1].length !== 0) {
        //console.log(value[0], value[1]);

        return res
          .status(205)
          .json({ errors: value[0], "data not found": value[1] });
      }
      if (value[1].length !== 0) {
        //console.log(Errors);
        //console.log(value[1]);
        return res
          .status(205)
          .json({ errors: value[0], "data not found": value[1] });
      }
      if (value[0].length !== 0) {
        //console.log(value[0]);

        return res
          .status(205)
          .json({ errors: value[0], "data not found": value[1] });
        //.json(value[0]);
      }
      return res.send("xlsx converted to json");

      //************ */
      //console.log(Errors);
      //console.log(noDataFound);

      //********************** */
      //console.log(value[0]);
      //yconsole.log(value[1]);
      // expected output: "Success!"
    });
    //console.log(data);
  });
};

//********************************************************************************************************************************************************* */
// module.exports.convertXLXSFile = (req, res) => {
//   //
// };
//RisingStar Documentation - Api test

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/uploads/businesses");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

module.exports.businessImageUploadHelper = multer({ storage: storage });

/**
 * upload Image functionality

 * uploadImageLink function need changes before production
 */

const UploadImageLink = (filename) => {
  if (process.env.ENV_MODE === "PRODUCTION") {
    return "s3.gg//";
  } else {
    return path.join(__dirname, `./src/uploads/businesses/${filename}`);
  }
};

module.exports.uploadImage = async (req, res) => {
  const link = UploadImageLink(req.file.originalname);

  const business = await Business.updateOne(
    { _id: req.params.businessId },
    {
      $set: {
        imageUrl: link,
      },
    },
    { new: true, useFindAndModify: false, upsert: true }
  );

  if (!business) {
    throw new Error("upload image unsucessful");
  }

  res.json({
    message: "sucessfully uploaded",
    business,
  });
};

// PAYMENT BY CLASS NOT WORKING BECAUSE LACK OF DATA, ONLY ON THE DUMMY DATA IT IS WORKING

// module.exports.storeMemberData = (req, res) => {
//   const member = new Member(req.body);
//   member.save((err, member) => {
//     if (err) {
//       return res.status(400).json({
//         error: "unable to save Member Data to database",
//       });
//     }
//     res.json(member);
//   });
// };

// //parameter extractor
// module.exports.getSessionById = (req, res, next, id) => {
//   Member.findById(id).exec((err, session) => {
//     if (err) {
//       return res.status(400).json({
//         err: "cannot find session by id",
//       });
//     }
//     req.session = session;
//     next();
//   });
// };

// module.exports.getMemberData = (req, res) => {
//   Member.find({ session: "Mon, 9:30 am to 11:30am" }).exec((err, item) => {
//     if (err) {
//       return res.status(400);
//     }
//     return res.json(item);
//   }); // Mon, 10:30 am to 11:30am
//};
