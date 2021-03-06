const { Business } = require("../../../models");

/**
 * Check if the mobileNo is already taken/registered or available
 * @param {*} mobileNo
 * @returns
 */
const isValidBusinessId = async (businessId, { req }) => {
  try {
    if (!businessId) {
      throw new Error("");
    }

    let business = await Business.findById(businessId);

    if (!business) {
      throw new Error("");
    }

    req.businessData = business;

    return true;
  } catch (err) {
    return Promise.reject("should be a valid business Id");
  }
};

module.exports = isValidBusinessId;
