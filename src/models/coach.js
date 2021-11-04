var mongoose = require('mongoose');


const coachSchema = new mongoose.Schema({

name:{
    type:String,
    trim:true,
    required:true,
    unique:true,
    maxlength:32,

}




}, {timestamps:true});

module.exports = mongoose.model("Coach",coachSchema);