const { newEnrolmentHandler } = require("./helpers");

/**
 * @param {*} req
 * @param {*} res
 * @returns
 */
const newEnrolment = async (req, res) => {
  return newEnrolmentHandler(req, res);
};

module.exports = newEnrolment;
