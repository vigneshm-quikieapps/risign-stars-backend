const mongoose = require("mongoose");

const evaluationSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 32,
        required: true,
        trim: true,
        unique:true
    },
    status: {
        type: String,
        default: "active",
        enum: ["active", "inactive"]

    },
    levelcount:{
    type:Number,
    default:0
    },
    levels:  [{
        skills: [],
        
    }]

}, { timestamps: true });

module.exports = mongoose.model("Evaluation", evaluationSchema);
