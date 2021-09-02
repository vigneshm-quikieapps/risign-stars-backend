const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 32,
        required: true,
        trim: true
    },
    code: String,
    tradename: {
        type: String,
        maxlength: 32,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        enum: ["sole", "limited", "liability", "partnership"]

    },
    about: {
        type: String,
        maxlength: 3200,
        trim: true
    },

    postcode: String,
    line1: String,
    line2: String,
    city: String,
    country: String
    
        
    
    

}, { timestamps: true });
module.exports = mongoose.model("Business", businessSchema);
// end