const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;


const businessSessionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required:true
        },
        pattern: [
            {
                day: {
                    type: String,
                    enum: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]
                },
                starttime: Date,
                endtime:Date
               
             },
         ],
        fullcapacity: {
            type: Number,
            default:30,
        },
        waitcapacity: {
            type: Number,
            default:10,
        },
        coach: {
            type: ObjectId,
            ref:"Coach"
        }

         },
  { timestamps: true }
);
module.exports = mongoose.model("BusinessSession", businessSessionSchema);