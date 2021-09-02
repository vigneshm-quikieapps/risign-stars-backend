var bcrypt = require("bcryptjs");

const generateHash = (password) => {
  let salt = bcrypt.genSaltSync(10);
  console.log(password, salt);
  return bcrypt.hashSync(password, salt);
};

module.exports = generateHash;
