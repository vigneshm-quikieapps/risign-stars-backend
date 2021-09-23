const getKey = (to) => {
  return `otp:resetPassword:${to}`;
};

module.exports = getKey;
