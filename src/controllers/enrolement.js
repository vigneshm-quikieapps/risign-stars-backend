const enrolement = require("../models/enrolement");



//createMember(Enrollement)
module.exports.create= async (req, res) => {
    try {
        let data = req.body
        let member = await enrolement.create(data)
        return res.status(201).send({ message: "enrolement Added Successfully", member })
    } catch (err) {
        console.error(err);
        return res.status(422).send({ message: err.message });
    }
  };
//getAllMember
  module.exports.getAll= async (req, res) => {
    try {
        let users = await  enrolement.find({});
        return res.send({ users });
      } catch (err) {
        console.error(err);
        return res.status(422).send({ message: err.message });
      }
  };
//updateSpecificMemberConsent
  module.exports.updateConsent= async (req, res) => {
    try {
    
      let options = { new: true };
      console.log(req.params.id)
      let student = await enrolement.findByIdAndUpdate(req.params.id, req.body, options);
      if (!student) {
          throw new DoesNotExistException();
      }
      return res.send({ message: "updated successfully", student });
  } catch (err) {
      console.error(err);
      return res.status(422).send({ message: err.message });
  }
  };
//getSpecificMember'sConsent
  module.exports.getConsent= async (req, res) => {
    try {
        let users = await  enrolement.findById(req.params.id);
        return res.send({ users:users.consent });
      } catch (err) {
        console.error(err);
        return res.status(422).send({ message: err.message });
      }
  };
//updateSpecificMemberAdditionalSection
module.exports.updateAdditionalSection= async (req, res) => {
  try {
  
    let options = { new: true };
    console.log(req.params.id)
    let student = await enrolement.findByIdAndUpdate(req.params.id, req.body, options);
    if (!student) {
        throw new DoesNotExistException();
    }
    return res.send({ message: "updated successfully", student });
} catch (err) {
    console.error(err);
    return res.status(422).send({ message: err.message });
}
};
//getSpecificMember'sAdditionalSection
module.exports.getAdditionalSection= async (req, res) => {
  try {
      let users = await  enrolement.findById(req.params.id);
      return res.send({ users:users.newsletter });
    } catch (err) {
      console.error(err);
      return res.status(422).send({ message: err.message });
    }
};


