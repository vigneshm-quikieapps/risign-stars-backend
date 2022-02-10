const { query, param, validationResult } = require("express-validator");
const { FILTER_TYPES } = require("../constants/constant");
const { check } = require("express-validator");
const { ENUM_STATUS, ENUM_BUSINESS_TYPE } = require("../constants/business");
const { BUSINESS } = require("./constants");
const { Business } = require("../models");

const businessFilter = (filters) => {
  if (!Array.isArray(filters)) {
    return false;
  }

  for (let i = 0; i < filters.length; i++) {
    let filter = JSON.parse(filters[i]);
    let { field, type, value } = filter;
    if (!field || typeof field != "string") {
      return Promise.reject(`filters[${i}].field should be string`);
    }
    if (!type || typeof type != "string" || !FILTER_TYPES.includes(type)) {
      return Promise.reject(
        `filters[${i}].type should be either ${FILTER_TYPES.join("/")}`
      );
    }
    if (!value || typeof value != "string") {
      return Promise.reject(`filters[${i}].value should be string`);
    }
  }
  return true;
};

const getAllBusinessValidationRules = () => {
  return [query("filters").optional().custom(businessFilter)];
};

const isUniqueCode = async (code) => {
  let business = await Business.find({ code: code });
  if (business.length)
    return Promise.reject(
      "This code is already used in another business. Please input a new unique code"
    );
};

const createBusinessValidationRules = () => {
  return [
    check("name", "is required").notEmpty(),
    check("code", "is required and should be at most 5 chars ")
      .custom(isUniqueCode)
      // .optional()
      .isLength({ max: 5 })
      .isString(),
    check("status", BUSINESS.STATUS.MESSAGE).isIn(ENUM_STATUS),
    check("tradename", "is required").notEmpty(),

    check("type", BUSINESS.TYPE.MESSAGE).isIn(ENUM_BUSINESS_TYPE),
    check("contactEmail", "should be a valid email address")
      .optional()
      .isEmail(),
    check("primaryPhone", "should be at least 6 chars")
      .optional()
      .isLength({ min: 6 }),
    check("primaryMobileNo", "should be at least 9 chars")
      .optional()
      .isLength({ min: 9 }),
    check("postcode", "should be at least 6 chars").isLength({
      min: 6,
    }),
    check("line1", "is required").notEmpty(),
    check("city", "is required").notEmpty(),
    check("country", "is required").notEmpty(),
    check("facebook", "should be a valid url").optional().isURL(),
    check("instagram", "should be a valid url").optional().isURL(),
    check("linkedin", "should be a valid url").optional().isURL(),
    check("pinterest", "should be a valid url").optional().isURL(),
  ];
};

/**
 * updating business code is not allowed
 *
 * as business code determines the club membership id
 *
 * @returns
 */
const updateBusinessValidationRules = () => {
  return [
    check("name", "is required").optional().notEmpty(),
    // check("code", "is required and should be at most 5 chars ")
    //   .optional()
    //   //.custom(isUniqueCode)
    //   // .optional()
    //   .isLength({ max: 5 })
    //   .isString(),
    check("status", BUSINESS.STATUS.MESSAGE).optional().isIn(ENUM_STATUS),
    check("tradename", "is required").optional().notEmpty(),

    check("type", BUSINESS.TYPE.MESSAGE).optional().isIn(ENUM_BUSINESS_TYPE),
    check("contactEmail", "should be a valid email address")
      .optional()
      .isEmail(),
    check("primaryPhone", "should be at least 6 chars")
      .optional()
      .isLength({ min: 6 }),
    check("primaryMobileNo", "should be at least 9 chars")
      .optional()
      .isLength({ min: 9 }),
    check("postcode", "should be at least 6 chars").optional().isLength({
      min: 6,
    }),
    check("line1", "is required").optional().notEmpty(),
    check("city", "is required").optional().notEmpty(),
    check("country", "is required").optional().notEmpty(),
    check("facebook", "should be a valid url").optional().isURL(),
    check("instagram", "should be a valid url").optional().isURL(),
    check("linkedin", "should be a valid url").optional().isURL(),
    check("pinterest", "should be a valid url").optional().isURL(),
  ];
};

//upload xlsx validation rules

const isBusinessValid = async (businessId) => {
  let business = await Business.findById(businessId);
  if (business === null) return Promise.reject("Please input a valid business");
};

const isFileXlsx = async (req, res, next) => {
  if (req.file) {
    let mimetype = req.file.mimetype.split("/")[1];
    if (mimetype !== "vnd.openxmlformats-officedocument.spreadsheetml.sheet")
      return res.status(200).json({
        errors: [
          {
            Payment: "Please input a valid xlsx file format",
          },
        ],
      });
    next();
  } else {
    return res.status(200).json({
      errors: [
        {
          Payment: "Payment file is required",
        },
      ],
    });
  }
};

const uploadValidateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(200).json({
    errors: extractedErrors,
  });
};

const uploadXlsxValidationRules = () => {
  return [
    check("billDate", "is required").notEmpty().isDate(),
    check("classId", "is required").notEmpty(),
    check("businessId", "is required").notEmpty().custom(isBusinessValid),
    param("businessId").custom(isBusinessValid),
  ];
};

//upload images, logos and social media links validation rules

const isImageTypeValid = async (req, res, next) => {
  let extensions = ["jpg", "jpeg", "png"];
  let uploadedImageFileExtensions = req.files?.newImages?.map((image) =>
    extensions.includes(image.mimetype.split("/")[1])
  );
  let uploadedLogoFileExtensions = req.files?.newLogos?.map((logo) =>
    extensions.includes(logo.mimetype.split("/")[1])
  );
  if (
    uploadedImageFileExtensions !== undefined &&
    uploadedImageFileExtensions.includes(false)
  )
    return res.status(200).json({
      errors: [
        {
          image: "Please input a valid Image file format. Eg: jpg, jpeg, png",
        },
      ],
    });
  if (
    uploadedLogoFileExtensions !== undefined &&
    uploadedLogoFileExtensions.includes(false)
  )
    return res.status(200).json({
      errors: [
        {
          logo: "Please input a valid logo file format. Eg: jpg, jpeg, png",
        },
      ],
    });
  next();
};

const socialMedialinksValidationRules = () => {
  return [
    param("businessId").custom(isBusinessValid),
    check("socialMediaUrl").optional().isString(),
    check("oldImagesLinks").optional().isString(),
    check("oldLogoLinks").optional().isString(),
  ];
};

module.exports = {
  getAllBusinessValidationRules,
  updateBusinessValidationRules,
  createBusinessValidationRules,
  uploadXlsxValidationRules,
  isFileXlsx,
  uploadValidateResult,
  socialMedialinksValidationRules,
  isImageTypeValid,
};
