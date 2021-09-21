const { lookup } = require("../../services/mobile");

const isValidMobile = async (mobileNo) => {
  /** mobile no is required */
  if (!mobileNo) {
    return Promise.reject("Mobile number is required");
  }

  /** check if the mobile no is valid */
  try {
    let phone_number = await lookup(mobileNo);
    if (!phone_number) {
      throw new Error();
    }
    return true;
  } catch (err) {
    console.error(err);
    return Promise.reject("Please enter a valid mobile number");
  }
};

module.exports = isValidMobile;
