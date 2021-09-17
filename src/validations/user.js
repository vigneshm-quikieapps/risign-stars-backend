const { body } = require("express-validator");
const isEmailAvailable = require("../helpers/user/isEmailAvailable");
const { DATA_PRIVILEDGES_TYPE } = require("../contants/constant");
const Business = require("../models/business");
const { USER, ADDRESS } = require("../contants/validation");
const Otp = require("../services/otp");

const businessIdValidation = async (businessId, { req }) => {
  try {
    if (req.body.dataPriviledges.type != "ALL") {
      if (!businessId) {
        throw new Error();
      }

      let business = await Business.findById(businessId);
      if (!business) {
        throw new Error();
      }
    }
    return true;
  } catch (err) {
    return Promise.reject(`Please select a valid Business`);
  }
};

/**
 * contact may either be email or mobileNo
 * @param {*} contact
 * @param {*} otp
 * @returns
 */
const verifyOtp = async (contact, otp) => {
  if (!otp) {
    return Promise.reject("otp is required");
  }

  try {
    await Otp.verify(contact, otp);
    return true;
  } catch (err) {
    console.error(err.message);
    return Promise.reject("Please enter valid OTP");
  }
};

const verifyEmailOtp = async (otp, { req }) => {
  let { email } = req.body;
  return verifyOtp(email, otp);
};

const verifyMobileNoOtp = async (otp, { req }) => {
  let { mobileNo } = req.body;
  return verifyOtp(mobileNo, otp);
};

const commonUserValidationRules = [
  body("name", USER.NAME.MESSAGE).isLength({ min: USER.NAME.LENGTH }),
  body("email", USER.EMAIL.MESSAGE).isEmail().custom(isEmailAvailable),
];

const signUpValidationRules = () => {
  return [
    ...commonUserValidationRules,
    body("password", USER.PASSWORD.MESSAGE).isLength({
      min: USER.PASSWORD.LENGTH,
    }),
    body("mobileNo", "mobileNo must be 10 Digit No").isLength({
      min: 10,
      max: 13,
    }),
    body("emailOTP").custom(verifyEmailOtp),
    body("mobileNoOTP").custom(verifyMobileNoOtp),
    body("postcode", ADDRESS.POSTCODE.MESSAGE).isLength({
      min: ADDRESS.POSTCODE.LENGTH,
    }),
    body("line1", ADDRESS.LINE1.MESSAGE).isLength({
      min: ADDRESS.POSTCODE.LENGTH,
    }),
    body("line2", ADDRESS.LINE2.MESSAGE)
      .optional()
      .isLength({ min: ADDRESS.LINE2.LENGTH }),
    body("city", ADDRESS.CITY.MESSAGE).isLength({ min: ADDRESS.CITY.LENGTH }),
    body("country", ADDRESS.COUNTRY.MESSAGE).isLength({
      min: ADDRESS.CITY.LENGTH,
    }),
  ];
};

const createUserValidationRules = () => {
  return [
    ...commonUserValidationRules,
    body("roles.*.id", "It should be an array"),
    body("roles.*.name", "It should be an array"),
    body(
      "dataPriviledges.type",
      `data priviledges type should be: ${DATA_PRIVILEDGES_TYPE.join("/")}`
    ).isIn(DATA_PRIVILEDGES_TYPE),
    body("dataPriviledges.businessId").custom(businessIdValidation),
  ];
};

const updateUserValidationRules = () => {
  return [
    ...commonUserValidationRules,
    body("email", USER.EMAIL.MESSAGE)
      .optional()
      .isEmail()
      .custom(isEmailAvailable),
    body("roles.*.id"),
    body("roles.*.name"),
    body(
      "dataPriviledges.type",
      `data priviledges type should be: ${DATA_PRIVILEDGES_TYPE.join("/")}`
    )
      .optional()
      .isIn(DATA_PRIVILEDGES_TYPE),
    body("dataPriviledges.businessId").optional().custom(businessIdValidation),
  ];
};

const signInValidationRules = () => {
  return [
    body("email", USER.EMAIL.MESSAGE).isEmail(),
    body("password", USER.PASSWORD.MESSAGE).isLength({
      min: USER.PASSWORD.LENGTH,
    }),
  ];
};

module.exports = {
  createUserValidationRules,
  updateUserValidationRules,
  signUpValidationRules,
  signInValidationRules,
};
