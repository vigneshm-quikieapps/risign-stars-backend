const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;


const businessActivityClassSchema = new mongoose.Schema(
    {

         pattern: {
      type: Object,
      default: {
        "mon":true,
        "tue":true,
        "wed":true,
        "thu":true,
        "fri":true,
        "sat":true,
        "sun":true,
      }
        },
        

        time: {
            starttimehr: {
                type: Number,
                enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                default:9,
                         },
            starttimemin: {
                type: Number,
                enum: [00,05, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60,],
                default: 00,
                        },
            starttimemeridian: {
                type: String,
                enum: ["AM", "PM"],
                default: "AM",
                        },
            endtimehr: {
                type: Number,
                enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                default:9,
                        },
            endtimemin: {
                type: Number,
                enum: [00,05, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60,],
                default:00,
                        },
            endtimemeridian: {
                type: String,
                enum: ["AM", "PM"],
                default: "AM",
                        },
      
        },
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
module.exports = mongoose.model("BusinessActivityClass", businessActivityClassSchema);