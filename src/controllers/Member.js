const Member = require("../models/Member");
const DoesNotExistError = require("../exceptions/DoesNotExistError");
const path = require("path");
const multer = require("multer");
const { getPaginationOptions } = require("../helpers/query");
const { Types } = require("mongoose");
const { Enrolment, User } = require("../models");
const getQuery2 = require("../helpers/query/getQuery2");
const { auditCreatedBy, auditUpdatedBy } = require("../helpers/audit");

//parameter extractor
// module.exports.getmemberIdById = (req, res, next, id) => {
//   Member.findById(id).exec((err, member) => {
//     if (err) {
//       return res.status(400).json({
//         error: "Member not found",
//       });
//     }
//     req.member = member;
//     next();
//   });
// };

//createMember
module.exports.create = async (req, res) => {
  try {
    let data = req.body;
    data = auditCreatedBy(req, data);
    let member = await Member.create(data);
    return res
      .status(201)
      .send({ message: "Member Added Successfully.", member });
  } catch (err) {
    console.error(err);
    return res.status(422).send({ message: err.message });
  }
};
//UpdateMember
module.exports.update = async (req, res) => {
  try {
    let options = { new: true };
    let payload = { ...req.body };
    payload = auditUpdatedBy(req, payload);

    let member = await Member.findByIdAndUpdate(
      req.params.memberId,
      { $set: payload },
      options
    );
    if (!member) {
      throw new DoesNotExistError();
    }
    return res.send({ message: "Member updated successfully.", member });
  } catch (err) {
    console.error(err);
    return res.status(422).send({ message: err.message });
  }
};

//deleteMemberWhohasn'tEnrolInAnyClass
module.exports.delete = async (req, res) => {
  try {
    // let  studentId  = req.params.id;
    let { deletedCount } = await Member.deleteOne({ _id: req.params.memberId });
    if (!deletedCount) {
      throw new DoesNotExistError();
    }
    return res.send({ message: "Member deleted successfully." });
  } catch (err) {
    console.error(err);
    return res.status(422).send({ message: err.message });
  }
};

//add new Emergency contact
module.exports.addNewEmergencyContact = (req, res) => {
  let EmergencyContacts = [];
  req.body.contacts.forEach((contact) => {
    EmergencyContacts.push({
      addressType: contact.addressType,
      firstName: contact.firstName,
      lastName: contact.lastName,
      contact: contact.contact,
      relationShip: contact.relationShip,
    });
  });

  //store this in DB
  Member.findOneAndUpdate(
    { _id: req.member._id },
    { $push: { contacts: EmergencyContacts } },
    { new: true },
    (err, contact) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to save EmergencyContacts.",
        });
      }
      return res.json(contact);
    }
  );
};

//update emergency contacts
module.exports.updateEmergencyContact = (req, res) => {
  Member.findOneAndUpdate(
    {
      _id: req.member._id,
      "contacts._id": req.params.contactsId,
    },
    {
      $set: {
        "contacts.$.addressType": req.body.addressType,
        "contacts.$.firstName": req.body.firstName,
        "contacts.$.lastName": req.body.lastName,
        "contacts.$.contact": req.body.contact,
        "contacts.$.relationShip": req.body.relationShip,
      },
    },
    { new: true, useFindAndModify: false },
    (err, contact) => {
      if (err) {
        return res.status(400).json({
          err: "Contact updation failed.",
        });
      }

      res.json(contact);
    }
  );
};
//getMemberEmerengyContacts
module.exports.getEmergencyContact = async (req, res) => {
  try {
    let member = await Member.findById(req.params.memberId);
    return res.send({ member: member.contacts });
  } catch (err) {
    console.error(err);
    return res.status(422).send({ message: err.message });
  }
};

module.exports.addMembership = async (req, res) => {
  try {
    if (!req.params.memberId) {
      throw new Error("Please enter a valid Member Id.");
    }
    if (!req.params.businessId) {
      throw new Error("Please enter a valid Business Id.");
    }
    let member = await Member.findById(req.params.memberId);

    if (!member) {
      throw new Error("Please enter a valid Member Id.");
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
      return res.json({
        updatedMsg: "New membership Id created.",
        updated,
      });
    }
    console.log(business);
    let Membership = business.membership.find(
      (item) => item.businessId === req.params.businessId
    );
    return res.json({
      success: "Clubmembership exists, Use existing Clubmembership id.",
      Membership,
    });
  } catch (err) {
    console.error(err);
    return res.status(422).send({ message: err.message });
  }
};
//business.membership.find(item => item.businessId === currentBusinessId)

//search for Member
module.exports.getAllMember = async (req, res) => {
  try {
    let { query, options } = getPaginationOptions(req);
    options.populate = {
      path: "parent",
      select: ["name", "email", "mobileNo"],
    };

    let response = await Member.paginate(query, options);
    return res.send(response);
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};

module.exports.get = async (req, res) => {
  try {
    let { memberId } = req.params;
    let member = await Member.findById(memberId).populate("userId");
    return res.send({ member });
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};

/**
 * upload Image helper
 */
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/uploads/businesses");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

module.exports.memberImageUploadHelper = multer({ storage: storage });

/**
 * upload Image functionality
 */

const UploadImageLink = (filename) => {
  if (process.env.ENV_MODE === "DEVELOPMENT") {
    return path.join(__dirname, `./src/uploads/members/${filename}`);
  } else {
    return "https://";
  }
};

module.exports.uploadImage = async (req, res) => {
  // console.log(req.file.originalname);
  // console.log(req.body.hi);
  const link = UploadImageLink(req.file.originalname);

  const member = await Member.updateOne(
    { _id: req.params.memberId },
    {
      $set: {
        imageUrl: link,
      },
    },
    { new: true, useFindAndModify: false, upsert: true }
  );

  if (!member) {
    throw new Error("Upload image unsucessful.");
  }

  res.json({
    message: "Sucessfully uploaded.",
    member,
  });
};

const getFilters = (req) => {
  let { filters = [] } = req.query;

  let parsedFilters = filters.map((filter) => JSON.parse(filter));

  let parentFilters = parsedFilters.filter(
    ({ field }) => field.split(".")[0] === "parent"
  );
  let memberFilters = parsedFilters.filter(
    ({ field }) => field.split(".").length === 1
  );

  parentFilters = parentFilters.map((filter) => {
    return { ...filter, field: filter.field.split(".")[1] };
  });

  req.filters = memberFilters.map((filter) => JSON.stringify(filter));
  return { parentFilters, memberFilters };
};

/**
 * get all members of a logged in user
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
module.exports.getAllMemberOfALoggedInUser = async (req, res) => {
  try {
    let { authUserData } = req;
    let { dataPrivileges } = authUserData;
    // let businessIds = dataPrivileges.map(({ businessId }) =>
    //   Types.ObjectId(businessId)
    // );
    let businessIds = dataPrivileges.list;
    let querys = {};
    if (!dataPrivileges.all) querys = { businessId: { $in: businessIds } };

    /**
     * get the member ids
     * the members should be enrolled in the business
     * where the logged in user has permission
     */
    let membersEnrolled = await Enrolment.aggregate([
      {
        $match: querys,
      },
      { $project: { memberId: 1 } },
      { $group: { _id: "$memberId" } },
    ]);

    let memberIds = membersEnrolled.map(({ _id }) => _id);

    /**
     * filters
     */
    let { parentFilters } = getFilters(req);

    let { query, options } = getPaginationOptions(req);
    query = { ...query, _id: { $in: memberIds } };

    if (parentFilters.length >= 1) {
      let query2 = getQuery2(parentFilters);
      let parents = await User.find(query2);
      let parentIds = parents.map((parent) => parent._id);
      query = { ...query, userId: { $in: parentIds } };
    }

    options.populate = {
      path: "parent",
      select: ["name", "email", "mobileNo"],
    };

    let response = await Member.paginate(query, options);
    return res.send(response);
  } catch (err) {
    console.log(err);
    return res.status(422).send({ message: err.message });
  }
};

/**
 * get all members of a logged in user (parent)
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
module.exports.getAllMemberOfALoggedInParent = async (req, res) => {
  try {
    let { authUserData } = req;
    let userId = authUserData._id;

    let { query, options } = getPaginationOptions(req);
    query = { ...query, userId };
    let response = await Member.paginate(query, options);
    return res.send(response);
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};
