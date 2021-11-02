const { Bill, Enrolment, BusinessSession } = require("../models");
const {
  getQuery,
  getOptions,
  getPaginationOptions,
} = require("../helpers/query");
const { PAYMENT_METHOD_MANUAL } = require("../constants/bill");
const { ENUM_TRANSFER_ALLOWED } = require("../constants/enrolment");
const { ObjectId } = require("mongoose").Types;

module.exports.getAll = async (req, res) => {
  try {
    let query = getQuery(req);
    let options = getOptions(req);
    let response = await Bill.paginate(query, options);
    return res.send(response);
  } catch (err) {
    return res.send({ message: err.message });
  }
};

module.exports.billsOfAMemberInAClass = async (req, res) => {
  try {
    let query = getQuery(req);
    let { memberId, classId } = req.body;
    query = { ...query, memberId, classId };
    let options = getOptions(req);

    let response = await Bill.paginate(query, options);
    return res.send(response);
  } catch (err) {
    return res.send({ message: err.message });
  }
};

module.exports.billsOfAMemberInABusiness = async (req, res) => {
  try {
    let query = getQuery(req);
    let { memberId, businessId } = req.body;
    query = { ...query, memberId, businessId };
    let options = getOptions(req);

    let response = await Bill.paginate(query, options);
    return res.send(response);
  } catch (err) {
    return res.send({ message: err.message });
  }
};

module.exports.enterTransaction = async (req, res) => {
  try {
    let { billId, reference, type } = req.body;
    let now = new Date();

    let update = {
      $set: {
        reference,
        method: PAYMENT_METHOD_MANUAL,
        type,
        paidAt: now,
      },
    };
    let options = { new: true, useFindAndModify: false };

    let bill = await Bill.findByIdAndUpdate(billId, update, options);

    return res.send({ message: "transaction recorded", bill });
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};

/**
 * get bill status of members in a session
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
module.exports.getBillStatusOfMembersInASession = async (req, res) => {
  try {
    let { sessionId, date } = req.body;

    let enrolment = await Enrolment.find(
      {
        sessionId,
        enrolledStatus: { $in: ENUM_TRANSFER_ALLOWED },
      },
      {
        memberId: 1,
      }
    );

    let enrolledMemberIds = enrolment.map(({ memberId }) => ObjectId(memberId));

    let { query, options } = getPaginationOptions(req);
    query = {
      ...query,
      memberId: { $in: enrolledMemberIds },
      billDate: new Date(date),
    };

    options.populate = [
      {
        path: "member",
        select: ["name"],
      },
    ];

    let response = await Bill.paginate(query, options);
    return res.send(response);
  } catch (err) {
    return res.send({ message: err.message });
  }
};
