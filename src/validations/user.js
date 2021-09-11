const { body } = require("express-validator");
const isEmailAvailable = require("../helpers/user/isEmailAvailable");
const {DATA_PRIVILEDGES_TYPE} = require("../contants/constant");
const Business = require("../models/business");

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
const createUserValidationRules = () => {
  return [
    body("email", "should be a valid Email").isEmail().custom(isEmailAvailable),
    body("firstName", "min length should be 2").isLength({ min: 2 }),
    body("lastName", "min length should be 2").isLength({ min: 2 }),
    body("roles").isArray(),
     body(
      "dataPriviledges.type",
      `data priviledges type should be: ${DATA_PRIVILEDGES_TYPE.join("/")}`
    ).isIn(DATA_PRIVILEDGES_TYPE),
    body("dataPriviledges.businessId").custom(businessIdValidation),
  ];
};

const updateUserValidationRules = () => {
  return [
    body("email", "should be a valid Email")
      .optional()
      .isEmail()
      .custom(isEmailAvailable),
    body("firstName", "min length should be 2").optional().isLength({ min: 2 }),
    body("lastName", "min length should be 2").optional().isLength({ min: 2 }),
    body("roles").optional().isArray(),
    body(
      "dataPriviledges.type",
      `data priviledges type should be: ${DATA_PRIVILEDGES_TYPE.join("/")}`
    )
      .optional()
      .isIn(DATA_PRIVILEDGES_TYPE),
    body("dataPriviledges.businessId").optional().custom(businessIdValidation),
  ];
};

module.exports = {
  createUserValidationRules,
  updateUserValidationRules,
};
