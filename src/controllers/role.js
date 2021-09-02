const DoesNotExistException = require("../exceptions/DoesNotExistException");
const Role = require("../models/Role")

module.exports.getAll = async (req, res) => {
    try {
        let roles = await Role.find({})
        return res.send({roles})
    } catch (err) {
        console.error(err)
        return res.status(422).send({message: err.message})
    }
};

module.exports.create = async (req, res) => {
    try {
        let role = await Role.create(req.body)
        return res.status(201).send({message: "added successfully", role})
    } catch (err) {
        console.error(err)
        return res.status(422).send({message: err.message})
    }
};

module.exports.get = async (req, res) => {
    try {
        let { roleId } = req.params
        let role = await Role.findById(roleId)
        if (!role) {
            throw new DoesNotExistException()
        }
        return res.send({role})
    } catch (err) {
        console.error(err)
        return res.status(422).send({message: err.message})
    }
};

module.exports.update = async (req, res) => {
    try {
        let { roleId } = req.params
        let options = {new: true}
        let role = await Role.findByIdAndUpdate(roleId, req.body, options)
        if (!role) {
            throw new DoesNotExistException()
        }
        return res.send({message: "updated successfully", role})
    } catch (err) {
        console.error(err)
        return res.status(422).send({message: err.message})
    }
};

module.exports.delete = async (req, res) => {
    try {
        let { roleId } = req.params
        let {deletedCount} = await Role.deleteOne({_id: roleId})
        if (!deletedCount) {
            throw new DoesNotExistException()
        }
        return res.send({message: "deleted successfully"})
    } catch (err) {
        console.error(err)
        return res.status(422).send({message: err.message})
    }
};