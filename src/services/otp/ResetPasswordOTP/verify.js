const Otp = require("../Otp");
const getKey = require("./getKey");

const verify = async (to, otp) => {
  let key = getKey(to);
  return Otp.verify(key, otp);
};

module.exports = verify;
