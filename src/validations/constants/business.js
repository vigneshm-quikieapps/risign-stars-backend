const { ENUM_STATUS, ENUM_BUSINESS_TYPE } = require("../../constants/business");

const messages = {
  STATUS: {
    MESSAGE: `should be either ${ENUM_STATUS.join(" / ")}`,
  },
  TYPE: {
    MESSAGE: `should be either ${ENUM_BUSINESS_TYPE.join(" / ")}`,
  },
};

module.exports = messages;
