const { body } = require("express-validator");
const {
  FUNCTIONAL_PRIVILEDGES,
  DATA_PRIVILEDGES_TYPE,
} = require("../contants/constant");
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

const createRoleValidationRules = () => {
  return [
    body("name", "Name should have atleast 3 characters").isLength({ min: 3 }),
    body("description", "description should atleast 5 characters")
      .optional()
      .isLength({ min: 5 }),
    body(
      "functionalPriviledges.*.type",
      `page name should be either: ${FUNCTIONAL_PRIVILEDGES.join("/")}`
    ).isIn(FUNCTIONAL_PRIVILEDGES),
    body(
      "functionPriviledges.*.permission.create",
      "permission.create must be boolean"
    ).isBoolean(),
    body(
      "functionPriviledges.*.permission.read",
      "permission.read must be boolean"
    ).isBoolean(),
    body(
      "functionPriviledges.*.permission.update",
      "permission.update must be boolean"
    ).isBoolean(),
    body(
      "functionPriviledges.*.permission.delete",
      "permission.delete must be boolean"
    ).isBoolean(),
    body(
      "dataPriviledges.type",
      `data priviledges type should be: ${DATA_PRIVILEDGES_TYPE.join("/")}`
    ).isIn(DATA_PRIVILEDGES_TYPE),
    body("dataPriviledges.businessId").custom(businessIdValidation),
  ];
};

const updateRoleValidationRules = () => {
  return [
    body("name", "Name should have atleast 3 characters")
      .optional()
      .isLength({ min: 3 }),
    body("description", "description should atleast 5 characters")
      .optional()
      .isLength({ min: 5 }),
    body(
      "functionalPriviledges.*.type",
      `page name should be either: ${FUNCTIONAL_PRIVILEDGES.join("/")}`
    )
      .optional()
      .isIn(FUNCTIONAL_PRIVILEDGES),
    body(
      "functionPriviledges.*.permission.create",
      "permission.create must be boolean"
    )
      .optional()
      .isBoolean(),
    body(
      "functionPriviledges.*.permission.read",
      "permission.read must be boolean"
    )
      .optional()
      .isBoolean(),
    body(
      "functionPriviledges.*.permission.update",
      "permission.update must be boolean"
    )
      .optional()
      .isBoolean(),
    body(
      "functionPriviledges.*.permission.delete",
      "permission.delete must be boolean"
    )
      .optional()
      .isBoolean(),
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
  createRoleValidationRules,
  updateRoleValidationRules,
};
