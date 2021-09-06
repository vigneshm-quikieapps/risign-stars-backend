const DoesNotExistException = require("../exceptions/DoesNotExistException")
const Student = require("../models/student")

module.exports.getAllStudent = async (req, res) => {
    try {
        let student = await Student.find({})
        return res.send({ student })
    } catch (err) {
        console.error(err)
        return res.status(422).send({ message: err.message })
    }
};

module.exports.create = async (req, res) => {
    try {
        let data = req.body
        let student = await Student.create(data)
        return res.status(201).send({ message: "Student Added Successfully", student })
    } catch (err) {
        console.error(err);
        return res.status(422).send({ message: err.message });
    }
};

module.exports.get = async (req, res) => {
    try {
        let { studentId } = req.params;
        let student = await Student.findById(studentId)
        if (!student) {
            throw new DoesNotExistException();
        }
        return res.send({ student });
    } catch (err) {
        console.error(err);
        return res.status(422).send({ message: err.message });
    }
};

module.exports.update = async (req, res) => {
    try {
        let { studentId } = req.params;
        let options = { new: true };
        let student = await Student.findByIdAndUpdate(studentId, req.body, options);
        if (!student) {
            throw new DoesNotExistException();
        }
        return res.send({ message: "updated successfully", student });
    } catch (err) {
        console.error(err);
        return res.status(422).send({ message: err.message });
    }
};

module.exports.delete = async (req, res) => {
    try {
        let { studentId } = req.params;
        let { deletedCount } = await User.deleteOne({ _id: studentId });
        if (!deletedCount) {
            throw new DoesNotExistException();
        }
        return res.send({ message: "deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(422).send({ message: err.message });
    }
};