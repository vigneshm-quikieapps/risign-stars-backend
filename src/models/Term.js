var mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const termSchema = new mongoose.Schema({
    business:{
        type: ObjectId,
        ref: "Business",
        required:true
        
    },
    code: {
        type: Number,
        unique: true,
        required:true

       },
    label:{
        type:String,
        trim: true,
        required:true
    },
    startdate: {
        type: Date
        
    },
    enddate: {
        type: Date
        
    },
    classsequence: {
        type: Number,
        required:true
    }




}, {timestamps:true});

module.exports = mongoose.model("Term",termSchema);