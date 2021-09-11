const Class = require("../models/class");


//getAllMember
module.exports.getAll = async (req, res) => {
      
  try {
      let users = await  Class.find({});
      return res.send({ users:users });
    } catch (err) {
      console.error(err);
      return res.status(422).send({ message: err.message });
    }
};
  module.exports.get = async (req, res) => {
      
    try {
        let users = await  Class.find({_id:req.params.id});
        return res.send({ users:users[0].charges });
      } catch (err) {
        console.error(err);
        return res.status(422).send({ message: err.message });
      }
  };


  module.exports.create = async (req, res) => {
    try {
        let data = req.body
        let member = await Cclasses.create(data)
        return res.status(201).send({ message: "Member Added Successfully", member })
    } catch (err) {
        console.error(err);
        return res.status(422).send({ message: err.message });
    }
};