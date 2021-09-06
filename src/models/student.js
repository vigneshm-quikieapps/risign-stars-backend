const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        parents: {
            type: String,
            required: true,
            trim: true
        },
        dob: {
            type: Date,
            required: true,
            default: Date.now
        },
        education: {
            type: String,
            required: true,
            trim: true
        },
        postcode: {
            type: String,
            required: true,
            trim: true,
        },
        line1: {
            type: String,
            required: true,
            trim: true,
        },
        line2: {
            type: String,
            trim: true,
        },
        city: {
            type: String,
            required: true,
            trim: true,
        },
        country: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model("Student", studentSchema)