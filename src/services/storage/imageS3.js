const S3 = require("aws-sdk/clients/s3");
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const bucketName = process.env.BUCKET_NAME + "/images";
const region = process.env.REGION;
const accessKeyId = process.env.ACCESS_KEY_ID;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3Info = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// function getBufferFromS3(key, callback) {
//   const buffers = [];
//   const s3 = new AWS.S3();
//   const stream = s3
//     .getObject({ Bucket: bucketName, Key: key })
//     .createReadStream();
//   stream.on("data", (data) => buffers.push(data));
//   stream.on("end", () => callback(null, Buffer.concat(buffers)));
//   stream.on("error", (error) => callback(error));
// }

// function getBufferFromS3Promise(key) {
//   return new Promise((resolve, reject) => {
//     getBufferFromS3(key, (error, s3buffer) => {
//       if (error) return reject(error);
//       return resolve(s3buffer);
//     });
//   });
// }

// const multerS3Config = multerS3({
//   s3: s3Info,
//   bucket: bucketName,
//   metadata: function (req, file, cb) {
//     cb(null, { fieldName: file.fieldname });
//   },
//   key: function (req, file, cb) {
//     console.log(file);
//     cb(null, new Date().toISOString() + "-" + file.originalname);
//   },
// });

const uploadImageS3Config = multerS3({
  s3: s3Info,
  bucket: bucketName,
  acl: "public-read",
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

module.exports = uploadImageS3Config;
