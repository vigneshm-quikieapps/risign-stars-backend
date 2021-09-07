const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;


const businessActivitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["active", "inactive"],
      default:"active"
    },
    registrationform: {
      type: String,
      required: true,
      enum: ["standard", "limited", "liability", "partnership"],
      default:"standard"
    },
    
  business:{
        type:ObjectId,
        ref:"Business",
        required:true
    },

    evaluation: {
      type:ObjectId,
        ref:"Evaluation",
        required:true
    },
    category:{
        type:ObjectId,
        ref:"Category",
        required:true
    },
      
    about: {
      type: String,
      maxlength: 3200,
      trim: true,
    },
    enrolmentControls: {
      type: Array,
      default: [
        {
          prop: "age",
          value: 3,
        },
      ]
     },
  
    class: [
      {
      type: ObjectId,
      ref:"BusinessActivityClass"
    },
    ],
    
    
    charges: [
    {
      name: String,
      amount: String,
      mandatory: Boolean,
      payFrequency: {
        type: String,
        enum: ["Monthly", "Annual"],
        default:"Annual"
        },
    },
  ],



  },
  { timestamps: true }
);
module.exports = mongoose.model("BusinessActivity", businessActivitySchema);
// end
