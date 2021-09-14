const Member = require("../models/Member")


//getALLMemberPersonalRecords
module.exports.getAllMember = async (req, res) => {
    try {
        let member = await Member.find({})
        return res.send({ member })
    } catch (err) {
        console.error(err)
        return res.status(422).send({ message: err.message })
    }
};   
//createMember
module.exports.create = async (req, res) => {
    try {
        let data = req.body
        let member = await Member.create(data)
        return res.status(201).send({ message: "Member Added Successfully", member })
    } catch (err) {
        console.error(err);
        return res.status(422).send({ message: err.message });
    }
};
//UpdateMember
module.exports.update = async (req, res) => {
    try {
    
        let options = { new: true };
        console.log(req.params.id)
        let student = await Member.findByIdAndUpdate(req.params.id, req.body, options);
        if (!student) {
            throw new DoesNotExistException();
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
            throw new DoesNotExistException();
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
        let member = await Member.findById(req.params.id)
        return res.send( {member:member.contacts} )
    } catch (err) {
        console.error(err)
        return res.status(422).send({ message: err.message })
    }
};