const { STARTS_WITH_FILTER, EQUALS_FILTER } = require("../contants/constant");
const Member = require("../models/Member");
const DoesNotExistError = require("../exceptions/DoesNotExistError");

//createMember
module.exports.create = async (req, res) => {
  try {
    let data = req.body;
    let member = await Member.create(data);
    return res
      .status(201)
      .send({ message: "Member Added Successfully", member });
  } catch (err) {
    console.error(err);
    return res.status(422).send({ message: err.message });
  }
};
//UpdateMember
module.exports.update = async (req, res) => {
  try {
    let options = { new: true };
    console.log(req.params.id);
    let student = await Member.findByIdAndUpdate(
      req.params.id,
      req.body,
      options
    );
    if (!student) {
      throw new DoesNotExistError();
    }
    return res.send({ message: "updated successfully", student });
  } catch (err) {
    console.error(err);
    return res.status(422).send({ message: err.message });
  }
};

//deleteMemberWhohasn'tEnrolInAnyClass
module.exports.delete = async (req, res) => {
  try {
    // let  studentId  = req.params.id;
    let { deletedCount } = await Member.deleteOne({ _id: req.params.id });
    if (!deletedCount) {
      throw new DoesNotExistError();
    }
    return res.send({ message: "deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(422).send({ message: err.message });
  }
};

//getMemberEmerengyContacts
module.exports.getEmergencyContact = async (req, res) => {
  try {
    let member = await Member.findById(req.params.id);
    return res.send({ member: member.contacts });
  } catch (err) {
    console.error(err);
    return res.status(422).send({ message: err.message });
  }
};

module.exports.addMembership = async (req, res) => {
  try {
    if (!req.params.memberId) {
      throw new Error("Please enter a valid Member Id");
    }
    if (!req.params.businessId) {
      throw new Error("Please enter a valid business Id");
    }
    let member = await Member.findById(req.params.memberId);

    if (!member) {
      throw new Error("Please enter a valid Member Id");
    }
    let business = await Member.findOne({
      _id: req.params.memberId,
      "membership.businessId": req.params.businessId,
    });

    if (business.length === 0) {
      let body = req.body;
      body.clubMembershipId = "unique string";
      let updated = await Member.findByIdAndUpdate(
        { _id: req.params.memberId },
        { $push: { membership: body } },
        { new: true, useFindAndModify: false }
      );
      return res.json({ updatedMsg: "new membership id created", updated });
    }
    console.log(business);
    let Membership = business.membership.find(
      (item) => item.businessId === req.params.businessId
    );
    return res.json({
      success: "Club membership exists use existing club membership id",
      Membership,
    });
  } catch (err) {
    console.error(err);
    return res.status(422).send({ message: err.message });
  }
};
//business.membership.find(item => item.businessId === currentBusinessId)

//search for Member
module.exports.getAllMember = (req, res) => {
  //limit setter to export or send limited business to client or front end

  let limit = req.query.limit ? parseInt(req.query.limit) : 10;
  let page = req.query.page;

  let skip = page ? parseInt(page) - 1 * limit : 0;
  let sortBy = req.query.sortBy ? req.query.sortBy : "asc";

  /**
   * query object
   */
  let query = Member.find().sort({ _id: sortBy }).skip(skip).limit(limit);

  /**
   * filter
   */
  let { filters = [] } = req.query;
  for (let { field, type, value } of filters) {
    switch (type) {
      case STARTS_WITH_FILTER:
        query.where(`${field}`, { $regex: new RegExp(`^${value}`, "i") });
        break;
      case EQUALS_FILTER:
        query.where(`${field}`, value);
        break;
      default:
        break;
    }
  }

  /**
   * execute the query
   */
  query.exec((err, Member) => {
    if (err) {
      return res.status(400).json({
        error: "NO Member FOUND",
      });
    }
    res.json(Member);
  });
};
