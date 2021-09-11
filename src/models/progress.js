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
                skills: [
                    {
                        name: { type: String },
                        status: { type: String, default: "Not_Started" },
                        StartedAt: { type: Date },
                        completedAt: { type: Date }
                    }
                ],

                // attend: [
                //     {
                //         Day: Date,
                //         attended: Boolean
                //     },
                // ],

                // progress: [
                //     {
                //         Day: Date,
                //         progress: Boolean
                //     },
                // ],

                // skills: [
                //     {
                //         names: String,
                //         status: "Not_STARTED",
                //         Day: Date,
                //         DAY: Date
                //     }
                // ]

            },
        ],


    },
    { timestamps: true }
);

module.exports = mongoose.model("Progress", progressSchema);
