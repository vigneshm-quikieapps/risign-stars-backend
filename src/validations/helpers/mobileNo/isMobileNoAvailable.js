const User = require("../../../models/User");

/**
 * Check if the mobileNo is already taken/registered or available
 * @param {*} mobileNo
 * @returns
 */
const isMobileNoAvailable = async (mobileNo) => {
  if (!mobileNo) {
    return Promise.reject("Invalid Mobile No");
  }

  let userCount = await User.count({ mobileNo });

  if (userCount) {
    return Promise.reject("Mobile no already taken");
  }

  return true;
};

module.exports = isMobileNoAvailable;
