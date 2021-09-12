const registration = require("../models/registration")





//UpdateMember
module.exports.update = async (req, res) => {
    try {
    
        let options = { new: true };
        console.log(req.params.id)
        let student = await registration.findByIdAndUpdate(req.params.id, req.body, options);
        if (!student) {
            throw new DoesNotExistException();
        }
        return res.send({ message: "updated successfully", student });
    } catch (err) {
        console.error(err);
        return res.status(422).send({ message: err.message });
    }
};