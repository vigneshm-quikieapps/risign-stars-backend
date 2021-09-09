const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            default: "active",
            enum: ["active", "inactive"],
        },
        levelcount: {
            type: Number,
            required: true,
        },
        levels: [
            {
                skill: { type: String },
                attend: {
                    type: Boolean,
                    default: false
                },
                progress: {
                    type: Boolean,
                    default: true
                }

            },
        ],


    },
    { timestamps: true }
);

module.exports = mongoose.model("Progress", progressSchema);
