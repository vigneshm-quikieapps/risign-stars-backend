const Otp = require("../Otp");
const getKey = require("./getKey");

const generate = async (to) => {
  let key = getKey(to);
  return Otp.generate(key);
};

module.exports = generate;
