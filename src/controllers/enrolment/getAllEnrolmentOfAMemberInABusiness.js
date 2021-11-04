const { getQuery, getOptions } = require("../../helpers/query");
const { Enrolment } = require("../../models");

/**
 * get all the enrolments of a member in a business
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getAllEnrolmentOfAMemberInABusiness = async (req, res) => {
  try {
    let { businessId, memberId } = req.body;
    let query = getQuery(req);
    query = { ...query, businessId, memberId };
    let options = getOptions(req);
    options.populate = [
      { path: "class", select: ["name"] },
      { path: "session", select: ["name", "term", "pattern"] },
    ];

    let response = await Enrolment.paginate(query, options);
    return res.send(response);
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};

module.exports = getAllEnrolmentOfAMemberInABusiness;
