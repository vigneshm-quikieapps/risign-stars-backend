const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);
const path = require("path");
const S3 = require("aws-sdk/clients/s3");
const AWS = require("aws-sdk");
const XLSX = require("xlsx");
const multer = require("multer");
const multerS3 = require("multer-s3");

const bucketName = process.env.BUCKET_NAME + "/xlsx";
const region = process.env.REGION;
const accessKeyId = process.env.ACCESS_KEY_ID;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

AWS.config.update({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
});

const s3Info = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

function uploadXlsxFile(file) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.originalname,
  };

  return s3Info.upload(uploadParams).promise();
}

// exports.uploadXlsxFile = uploadXlsxFile;

function getBufferFromS3(key, callback) {
  const buffers = [];
  const s3 = new AWS.S3();
  const stream = s3
    .getObject({ Bucket: bucketName, Key: key })
    .createReadStream();
  stream.on("data", (data) => buffers.push(data));
  stream.on("end", () => callback(null, Buffer.concat(buffers)));
  stream.on("error", (error) => callback(error));
}

function getBufferFromS3Promise(key) {
  return new Promise((resolve, reject) => {
    getBufferFromS3(key, (error, s3buffer) => {
      if (error) return reject(error);
      return resolve(s3buffer);
    });
  });
}

const getWorkbookS3 = async (file) => {
  // console.log("key", file);
  const buffer = await getBufferFromS3Promise(file.key);
  // console.log("buffer",buffer,)
  const workbook = XLSX.read(buffer, {
    type: "array",
    cellDates: true,
  });
  return workbook;
};

// exports.getWorkbookS3 = getWorkbookS3;

const getWorkbookLocal = async (file) => {
  // console.log("inn", file.originalname);

  const workbook = XLSX.readFile(
    path.join(__dirname, `../../controllers/temp/xlsx/${file.originalname}`),
    {
      type: "binary",
      cellDates: true,
    }
  );
  return workbook;
};

// exports.getWorkbookLocal = getWorkbookLocal;

const s3Config = new AWS.S3({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  Bucket: process.env.bucketName,
});

const multerS3Config = multerS3({
  s3: s3Info,
  bucket: bucketName,
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    console.log(file);
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

// exports.multerS3Config = multerS3Config;

const fileStorageLocal = multer.diskStorage({
  destination: (req, file, cb) => {
    // path.join(__dirname, `./temp/xlsx`)
    // cb(null, path.join(__dirname, `./temp/xlsx/`));
    cb(null, path.join(__dirname, `../../controllers/temp/xlsx/`));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// exports.fileStorageLocal = fileStorageLocal;

let s3Xlsx = {
  getWorkBook: async (key) => {
    const result = await getWorkbookS3(key);
    return result;
  },
  filestorage: multerS3Config,
};

let localXlsx = {
  getWorkBook: async (file) => {
    const result = await getWorkbookLocal(file);
    return result;
  },
  filestorage: fileStorageLocal,
};

let storageXlsx;
if (process.env.storage === "s3") {
  // console.log("s3");
  storageXlsx = s3Xlsx;
} else {
  // console.log("local");
  storageXlsx = localXlsx;
}
module.exports = storageXlsx;
