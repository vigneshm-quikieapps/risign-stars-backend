const { Business, Bill, Xlsx, Counter, Member } = require("../models");
const multer = require("multer");
const XLSX = require("xlsx");
const CSVToJSON = require("csvtojson");
const { STARTS_WITH_FILTER, EQUALS_FILTER } = require("../constants/constant");
const { getQuery, getOptions } = require("../helpers/query");
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const { Types } = require("mongoose");
const DoesNotExistError = require("../exceptions/DoesNotExistError");
const { auditCreatedBy } = require("../helpers/audit");
const storageXlsx = require("../services/storage/xlsxS3");
const { BATCH_PROCESS_ID } = require("../constants/counter");

const unlinkAsync = promisify(fs.unlink);
//parameter extractor
// module.exports.getBusinessIdById = (req, res, next, id) => {
//   Business.findById(id).exec((err, business) => {
//     if (err) {
//       return res.status(400).json({
//         error: "Product not found",
//       });
//     }
//     req.business = business;
//     next();
//   });
// };

//create business
module.exports.createBusiness = (req, res) => {
  let payload = { ...req.body };
  payload = auditCreatedBy(req, payload);
  const business = new Business(payload);
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
module.exports.getBusiness = async (req, res) => {
  try {
    let { businessId } = req.params;
    let business = await Business.findById(businessId).populate("finance");

    if (!business) {
      throw new Error("Not found");
    }

    return res.send({ business });
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};

// delete controllers
module.exports.deleteBusiness = async (req, res) => {
  try {
    let { businessId } = req.params;
    let { deletedCount } = await Business.deleteOne({ _id: businessId });
    if (!deletedCount) {
      throw new DoesNotExistError();
    }
    return res.send({ message: "deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(422).send({ message: err.message });
  }
};

/**
 * updating business code is not allowed
 *
 * as business code determines the club membership id
 *
 * @param {*} req
 * @param {*} res
 */
module.exports.updateBusiness = async (req, res) => {
  try {
    let data = { ...req.body };
    delete data.code; /** updating business code is not allowed  */

    let { businessId } = req.params;
    let options = { new: true, useFindAndModify: false };

    let business = await Business.findByIdAndUpdate(
      businessId,
      { $set: data },
      options
    );
    if (!business) {
      throw new DoesNotExistError();
    }
    return res.send({ message: "updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(422).send({ message: err.message });
  }
};

/**
 * all Business listing
 */
module.exports.getAllBusinesses = async (req, res) => {
  try {
    let query = getQuery(req);
    let options = getOptions(req);
    let response = await Business.paginate(query, options);
    return res.send(response);
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};

/**
 * get all businesses of authenticated user
 */
module.exports.getAllBusinessesOfLoginUser = async (req, res) => {
  try {
    let { authUserData } = req;

    if (!authUserData) {
      throw new Error("User does not exist");
    }

    let { dataPrivileges } = authUserData;
    let businessIds = dataPrivileges.list;
    // .map(( businessId ) =>
    //   Types.ObjectId(businessId)
    // );

    let query = getQuery(req);
    let options = getOptions(req);
    if (!dataPrivileges.all) query = { ...query, _id: { $in: businessIds } };

    let response = await Business.paginate(query, options);

    return res.send(response);
  } catch (err) {
    console.log("wow");
    return res.status(422).send({ message: err.message });
  }
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
// module.exports.uploadXLXSFile = (req, res) => {
//   const filestorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "./temp/xlsx");
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.originalname);
//     },
//   });
//   // Uploading the CSV file
//   const upload = multer({
//     storage: filestorage,
//     fileFilter: (req, file, cb) => {
//       //console.log(file);
//       if (path.extname(file.originalname) !== ".xlsx") {
//         return res.send("file type not valid!!");
//       }

//       cb(null, true);
//     },
//   }).single("payment");
//   upload(req, res, function (err) {
//     if (err) {
//       return res.json(err);
//     }
//     //**************************** */
//     //read xlsx file from folder
//     var workbook = XLSX.readFile(`./temp/xlsx/${req.file.originalname}`, {
//       type: "binary",
//       cellDates: true,
//     });
//     var sheet_name_list = workbook.SheetNames;
//     //console.log(sheet_name_list); // getting as Sheet1
//     let data = [];
//     //converting xlxs to json
//     sheet_name_list.forEach(function (y) {
//       var worksheet = workbook.Sheets[y];
//       //getting the complete sheet
//       // console.log(worksheet);

//       var headers = {};
//       for (var z in worksheet) {
//         if (z[0] === "!") continue;
//         //parse out the column, row, and value
//         var col = z.substring(0, 1);
//         // console.log(col);

//         var row = parseInt(z.substring(1));
//         // console.log(row);

//         var value = worksheet[z].v;
//         // console.log(value);

//         //store header names
//         if (row == 1) {
//           headers[col] = value;
//           // storing the header names
//           continue;
//         }

//         if (!data[row]) data[row] = {};
//         data[row][headers[col]] = value;
//       }
//       //drop those first two rows which are empty
//       data.shift();
//       data.shift();
//       //console.log(data);
//     });
//     //*************************** */
//     //************** */

//     //console.log("one");
//     //validating the spreadsheet data for errors in them
//     const promise1 = new Promise((resolve) => {
//       let errorsInData = [];
//       let amountError = [];
//       let noDataFound = [];
//       let classId = req.body.classid;
//       data.forEach((bill, index) => {
//         //console.log("two");
//         Bill.findOne(
//           {
//             clubMembershipId: bill.Membershipnumber,
//             classId: classId,
//             billDate: req.body.BillDate,
//           },
//           (err, data) => {
//             //accumilate all errors inside errorsInData array
//             if (err) {
//               errorsInData.push({
//                 line: index + 1,
//                 "err msg": "please enter valid fields to process payment",
//                 bill: bill,
//               });
//               //console.log(errorsInData);
//             }
//             //accumilate all no data found errors inside noDataFound array
//             if (!data) {
//               //return res.status(400);
//               noDataFound.push({
//                 line: index + 1,
//                 "err msg":
//                   "no Bill Found for this Data please enter a valid data",
//                 bill: bill,
//               });
//               //console.log(noDataFound);
//             }
//             // if the amount is underpaid so accumulating all that erreors in amountError array
//             if (data) {
//               //return res.status(400);
//               if (data.total < bill.Amount)
//                 amountError.push({
//                   line: index + 1,
//                   "err msg": `amount ${bill.Amount} should be greater than or equal to bill Amount: ${data.total}`,
//                   bill: bill,
//                 });
//               //console.log(noDataFound);
//             }
//           }
//         );
//         resolve([errorsInData, noDataFound, amountError]);
//       });
//     });
//     //returning errors faced during validations check
//     promise1
//       .then(async (value) => {
//         //******************** */
//         //console.log(value);

//         if (
//           value[0].length !== 0 &&
//           value[1].length !== 0 &&
//           value[2].length !== 0
//         ) {
//           //console.log(value[0], value[1]);

//           return res.status(205).json({
//             errors: value[0],
//             "data not found": value[1],
//             amountError: value[2],
//           });
//         } else if (value[1].length !== 0 && value[2].length !== 0) {
//           //console.log(value[0], value[1]);

//           return res.status(205).json({
//             "data not found": value[1],
//             amountError: value[2],
//           });
//         } else if (value[0].length !== 0 && value[2].length !== 0) {
//           //console.log(value[0], value[1]);

//           return res.status(205).json({
//             errors: value[0],
//             amountError: value[2],
//           });
//         } else if (value[0].length !== 0 && value[1].length !== 0) {
//           //console.log(value[0], value[1]);

//           return res.status(205).json({
//             errors: value[0],
//             "data not found": value[1],
//           });
//         } else if (value[0].length !== 0) {
//           //console.log(errorsInData);
//           //console.log(value[1]);
//           return res.status(205).json({ errors: value[0] });
//         } else if (value[1].length !== 0) {
//           //console.log(value[0]);

//           return res.status(205).json({ "data not found": value[1] });
//           //.json(value[0]);
//         } else if (value[2].length !== 0) {
//           //console.log(value[0]);

//           return res.status(205).json({ amountError: value[2] });
//           //.json(value[0]);
//         } else {
//           //if no errors present updating the whole bills from preadsheet data
//           // data.map((bill, index) => {
//           //   Bill.findOneAndUpdate(
//           //     {
//           //       clubMembershipId: bill.Membershipnumber,
//           //       classId: req.body.classid,
//           //       billDate: req.body.BillDate,
//           //     },
//           //     {
//           //       $set: {
//           //         paidAt: Date.now(),
//           //       },
//           //     },
//           //     { new: true, useFindAndModify: false },
//           //     (err) => {
//           //       if (err) {
//           //         console.log(err);
//           //         return res.status(400).json({
//           //           err: `Bill  updation failed !!! at line no ${index + 1}`,
//           //         });
//           //       }
//           //     }
//           //   );
//           // });
//           // return res.status(400).json({
//           //   success: `Bill  updation done `,
//           // });

//           //**************************  if no errors present updating the whole bills from preadsheet data  */
//           await Bill.bulkWrite(
//             data.map((bill) => ({
//               updateOne: {
//                 filter: {
//                   clubMembershipId: bill.Membershipnumber,
//                   classId: req.body.classid,
//                   billDate: req.body.BillDate,
//                 },
//                 update: {
//                   $set: {
//                     paidAt: Date.now(),
//                   },
//                 },
//                 new: true,
//                 useFindAndModify: false,
//               },
//             })) //,
//             // {},
//             // (err) => {
//             //   if (err) {
//             //     console.log(err);
//             //     return res.status(400).json({
//             //       err: `Bill  updation failed !!! at line no `,
//             //     });
//             //   }
//             // }
//           );
//         }
//       })
//       //finally delete the uploaded spreadsheets from server
//       .then(async () => {
//         await unlinkAsync(`./temp/xlsx/${req.file.originalname}`);
//         console.log("im here deleted spread sheet");
//         return;
//       });
//     //console.log(data);
//   });
// };

module.exports.uploadXLXSFile = async (req, res) => {
  // get xlsx workbook
  var workbook = await storageXlsx.getWorkBook(req.file);
  var sheet_name_list = workbook.SheetNames;
  // let data = [];

  //converting xlxsworkbook to array of json data
  let data = xlsxToJson(sheet_name_list, workbook);
  let classId = req.body.classId;
  // check errors in array of json data
  let { errorsInData, amountError, noDataFound } = await checkError(
    data,
    req.body,
    classId
  );
  let location = req.file.location ? req.file.location : "../temp/xlsx";
  if (
    errorsInData.length !== 0 &&
    amountError.length !== 0 &&
    noDataFound.length !== 0
  ) {
    // console.log("in1", value[0], value[1]);
    let xlsxData = await createErrorRecordXlsx(
      req.body,
      location,
      data,
      errorsInData,
      amountError,
      noDataFound
    );
    return res.status(200).json({
      errors: errorsInData,
      dataNotFound: noDataFound,
      amountError: amountError,
      xlsxData,
      message: "Payment upload failed",
    });
  } else if (amountError.length !== 0 && noDataFound.length !== 0) {
    let xlsxData = await createErrorRecordXlsx(
      req.body,
      location,
      data,
      errorsInData,
      amountError,
      noDataFound
    );
    return res.status(200).json({
      dataNotFound: noDataFound,
      amountError: amountError,
      xlsxData,
      message: "Payment upload failed",
    });
  } else if (errorsInData.length !== 0 && amountError.length !== 0) {
    let xlsxData = await createErrorRecordXlsx(
      req.body,
      location,
      data,
      errorsInData,
      amountError,
      noDataFound
    );
    return res.status(200).json({
      errors: errorsInData,
      amountError: amountError,
      xlsxData,
      message: "Payment upload failed",
    });
  } else if (errorsInData.length !== 0 && noDataFound.length !== 0) {
    let xlsxData = await createErrorRecordXlsx(
      req.body,
      location,
      data,
      errorsInData,
      amountError,
      noDataFound
    );
    return res.status(200).json({
      errors: errorsInData,
      dataNotFound: noDataFound,
      xlsxData,
      message: "Payment upload failed",
    });
  } else if (errorsInData.length !== 0) {
    let xlsxData = await createErrorRecordXlsx(
      req.body,
      location,
      data,
      errorsInData,
      amountError,
      noDataFound
    );
    return res.status(200).json({
      errors: errorsInData,
      xlsxData,
      message: "Payment upload failed",
    });
  } else if (amountError.length !== 0) {
    let xlsxData = await createErrorRecordXlsx(
      req.body,
      location,
      data,
      errorsInData,
      amountError,
      noDataFound
    );
    return res.status(200).json({
      amountError: amountError,
      xlsxData,
      message: "Payment upload failed",
    });
  } else if (noDataFound.length !== 0) {
    let xlsxData = await createErrorRecordXlsx(
      req.body,
      location,
      data,
      errorsInData,
      amountError,
      noDataFound
    );
    return res.status(200).json({
      dataNotFound: noDataFound,
      xlsxData,
      message: "Payment upload failed",
    });
  } else {
    //**************************  if no errors present updating the whole bills from spreadsheet data  */
    try {
      // create new xlsx record
      let { xlsxData, batchProcessId } = await createRecordXlsx(
        req.body,
        location,
        "COMPLETED_SUCCESSFUL",
        data,
        errorsInData,
        amountError,
        noDataFound
      );
      //  update bill transactions in batch
      await billBulkWrite(data, req.body, batchProcessId);
      return res
        .status(200)
        .send({ message: "Payment upload successfull", xlsxData });
    } catch (err) {
      console.error(err);
      return res.status(422).send({ message: err.message });
    }
  }
};
var xlsxStorage = storageXlsx.filestorage;

module.exports.businessXlsxUploadHelper = multer({ storage: xlsxStorage });

const xlsxToJson = (sheet_name_list, workbook) => {
  let data = [];
  sheet_name_list.forEach(function (y) {
    var worksheet = workbook.Sheets[y];
    //getting the complete sheet
    var headers = {};
    for (var z in worksheet) {
      if (z[0] === "!") continue;
      //parse out the column, row, and value
      var col = z.substring(0, 1);
      var row = parseInt(z.substring(1));
      var value = worksheet[z].v;
      // if (row != 1 && col == "A") {
      //   value = new Date(value);
      // }
      //store header names
      if (row == 1) {
        if (value.includes("Membership")) {
          value = "membershipNumber";
        }
        if (value.includes("Member")) {
          value = "memberName";
        }
        if (value.includes("£")) {
          value = "amount";
        }
        if (value.includes("Payment")) {
          value = "paymentMethod";
        }
        if (value.includes("Type")) {
          value = "type";
        }
        headers[col] = value;
        continue;
      }

      if (!data[row]) data[row] = {};
      data[row][headers[col]] = value;
    }
    //drop those first two rows which are empty
    data.shift();
    data.shift();
  });
  return data;
};

const checkError = async (data, body, classId) => {
  let errorsInData = [];
  let amountError = [];
  let noDataFound = [];
  for (let i = 0; i < data.length; i++) {
    let bill = data[i];
    let index = i;
    await Bill.findOne(
      {
        clubMembershipId: bill.membershipNumber,
        classId: classId,
        billDate: body.billDate,
      },
      (err, data) => {
        //accumilate all errors inside errorsInData array
        if (err) {
          errorsInData.push({
            line: index + 1,
            "err msg": "please enter valid fields to process payment",
            bill: bill,
          });
        }
        //accumilate all no data found errors inside noDataFound array
        if (!data) {
          noDataFound.push({
            line: index + 1,
            "err msg": "no Bill Found for this Data please enter a valid data",
            bill: bill,
          });
        }
        // if the amount is underpaid so accumulating all that erreors in amountError array
        if (data) {
          if (data.total < bill.amount) {
            amountError.push({
              line: index + 1,
              "err msg": `amount ${bill.amount} should be equal to bill Amount: ${data.total}`,
              bill: bill,
            });
          }
        }
      }
    ).clone();
  }
  return { errorsInData, amountError, noDataFound };
};

const billBulkWrite = async (data, body, batchProcessId) => {
  await Bill.bulkWrite(
    data.map((bill) => ({
      updateOne: {
        filter: {
          clubMembershipId: bill.membershipNumber,
          classId: body.classId,
          billDate: body.billDate,
          "partialTransactions.0": { $exists: false },
          total: { $eq: bill.amount },
        },
        // $expr: { $gt:["$total", "$partialTransactionAmount"] },
        update: {
          $push: {
            partialTransactions: {
              amount: bill.amount,
              paidAt: bill.Date,
              transactionType: bill.type,
              method: bill.paymentMethod,
              batchProcessId: batchProcessId,
              processDate: bill.Date,
            },
          },
        },
        new: true,
        useFindAndModify: false,
      },
    }))
  );
};

const createRecordXlsx = async (
  body,
  location,
  status,
  data,
  errorsInData,
  amountError,
  noDataFound
) => {
  let filter = {
    type: BATCH_PROCESS_ID,
    businessId: body.businessId,
  };
  let counter = await Counter.findOne(filter);
  let update = {
    type: BATCH_PROCESS_ID,
    businessId: body.businessId,
  };
  let options = { upsert: true, new: true };
  let value;
  if (counter) {
    value = counter.sequence_value;
    value += 1;
    update = { ...update, sequence_value: value };
  } else {
    update = { ...update, sequence_value: 1 };
  }
  // increase the sequence value
  counter = await Counter.findOneAndUpdate(filter, update, options);
  let batchProcessId = counter.sequence_value;

  let memberPaymentList = [];
  await uploadPaymentList(data, noDataFound, amountError, errorsInData).then(
    (res) => memberPaymentList.push(...res)
  );

  // create new xlsx record
  let xlsxData = await Xlsx.create({
    xlsxUrl: location,
    batchProcessId: batchProcessId,
    status: status,
    uploadPaymentList: memberPaymentList,
  });
  return { xlsxData, batchProcessId };
};

const createErrorRecordXlsx = async (
  body,
  location,
  data,
  errorsInData,
  amountError,
  noDataFound
) => {
  let { xlsxData, batchProcessId } = await createRecordXlsx(
    body,
    location,
    "COMPLETED_ERRORS_IN_DATA",
    data,
    errorsInData,
    amountError,
    noDataFound
  );
  return xlsxData;
};

const uploadPaymentList = async (
  data,
  noDataFound,
  amountError,
  errorsInData
) => {
  if (
    noDataFound.length > 0 ||
    amountError.length > 0 ||
    errorsInData.length > 0
  ) {
    let resultData = [];
    noDataFound.length > 0 &&
      (await noDataFound.map((li) => {
        let dataObject = data.find(
          (err) => li.bill.membershipNumber === err.membershipNumber
        );
        return resultData.push({
          ...dataObject,
          noDataFound: li["err msg"],
          amountError: "",
          errorsInData: "",
          uploadStatus: "Error",
        });
      }));
    amountError.length > 0 &&
      (await amountError.map((li) => {
        let dataObject = data.find(
          (err) => li.bill.membershipNumber === err.membershipNumber
        );
        return resultData.push({
          ...dataObject,
          amountError: li["err msg"],
          noDataFound: "",
          errorsInData: "",
          uploadStatus: "Error",
        });
      }));
    errorsInData.length > 0 &&
      (await errorsInData.map((li) => {
        let dataObject = data.find(
          (err) => li.bill.membershipNumber === err.membershipNumber
        );
        return resultData.push({
          ...dataObject,
          errorsInData: li["err msg"],
          noDataFound: "",
          amountError: "",
          uploadStatus: "Error",
        });
      }));
    let uniqueMemberList = data.map((x) => {
      const item = resultData.find(
        (li) => li.membershipNumber === x.membershipNumber
      );
      return item
        ? item
        : {
            ...x,
            uploadStatus: "Success",
            noDataFound: "",
            amountError: "",
            errorsInData: "",
          };
    });
    return uniqueMemberList;
  }
  if (
    errorsInData.length <= 0 &&
    amountError.length <= 0 &&
    noDataFound.length <= 0
  ) {
    return data.map((li) => {
      return {
        ...li,
        uploadStatus: "Success",
        noDataFound: "",
        amountError: "",
        errorsInData: "",
      };
    });
  }
};
//********************************************************************************************************************************************************* */

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
