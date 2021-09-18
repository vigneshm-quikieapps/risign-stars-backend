const enrolement = require("../models/enrolement");
const BusinessSession = require("../models/businessSession");
const DoesNotExistError = require("../exceptions/DoesNotExistError");

//createMember(Enrollement)
module.exports.create = async (req, res) => {
  try {
    let data = req.body;
    let member = await enrolement.create(data);
    return res
      .status(201)
      .send({ message: "enrolement Added Successfully", member });
  } catch (err) {
    console.error(err);
    return res.status(422).send({ message: err.message });
  }
};

module.exports.create = async (req, res) => {
  try {
    let businessId = req.body.businessId;
    let sessionId = req.body.sessionId;
  } catch (err) {
    console.error(err);
    return res.status(422).send({ message: err.message });
  }
};

//getAllMember
module.exports.getAll = async (req, res) => {
  try {
    let users = await enrolement.find({});
    return res.send({ users });
  } catch (err) {
    console.error(err);
    return res.status(422).send({ message: err.message });
  }
};
//updateSpecificMemberConsent
module.exports.updateConsent = async (req, res) => {
  try {
    let options = { new: true };
    console.log(req.params.id);
    let student = await enrolement.findByIdAndUpdate(
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
//getSpecificMember'sConsent
module.exports.getConsent = async (req, res) => {
  try {
    let users = await enrolement.findById(req.params.id);
    return res.send({ users: users.consent });
  } catch (err) {
    console.error(err);
    return res.status(422).send({ message: err.message });
  }
};
//updateSpecificMemberAdditionalSection
module.exports.updateAdditionalSection = async (req, res) => {
  try {
    let options = { new: true };
    console.log(req.params.id);
    let student = await enrolement.findByIdAndUpdate(
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
//getSpecificMember'sAdditionalSection
module.exports.getAdditionalSection = async (req, res) => {
  try {
    let users = await enrolement.findById(req.params.id);
    return res.send({ users: users.newsletter });
  } catch (err) {
    console.error(err);
    return res.status(422).send({ message: err.message });
  }
};

//update registration
module.exports.updateRegistration = async (req, res) => {
  try {
    let users = await enrolement.findById(req.params.enrolementId);
    if (!users) {
      throw new Error();
    }
    let options = { new: true };

    let student = await enrolement.findByIdAndUpdate(
      req.params.enrolementId,
      { discontinuationReason: "CLASS_TRANSFER" },
      options
    );

    return res.send({ updatedenrolement: student });
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
  // next();
};
module.exports.updateSessionCapacity = async (req, res) => {
  try {
    let session = await BusinessSession.findById(req.params.sessionId);
    if (!session) {
      throw new Error("");
    }
    let options = { new: true };
    if (session.fullcapacityfilled == 0) {
      /** written by shubham, session.fullcapacityfilled = 0, updated to, session.fullcapacityfilled == 0 */
      throw new Error("session is already zero");
    }
    let student = await BusinessSession.findByIdAndUpdate(
      req.params.sessionId,
      { fullcapacityfilled: session.fullcapacityfilled - 1 },
      options
    );

    return res.send({ updatedenrolement: student });
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
  // next();
};
