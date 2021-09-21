const getKey = (to) => {
  return `otp:verifyContact:${to}`;
};

module.exports = getKey;
