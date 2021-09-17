const mongoose = require("mongoose");

const { SKILL_PROGRESS_STATUS } = require("../contants/constant")

const progressSchema = new mongoose.Schema(
    {
        studentId: {
            type: String,
            required:true
        },
        studentName: {
            type: String,
            required:true
        },
        sessionId: {
            type: String,
            required:true
        },
        classId: {
            type: String,
            required:true
        },
        className: {
            type: String,
            required:true
        },
        // evaluationScheme: EvaluationScheme,
        levelCount: {
            type: Number,
            required:true
        },
        levels: [
            {
                skills: [
                    {
                    name: {
                        type: String,
                        required:true
                    },
                    status: {
                        type: String,
                        required:true,
                        enum: SKILL_PROGRESS_STATUS
                    },
                    startedAt: Date /** when the skill is marked as inProgress */,
                    completedAt: Date /** when the shill is marked as attained */,
                    },
                ],
                status: {
                    type: String,
                    required:true,
                    enum: SKILL_PROGRESS_STATUS
                },
            },
        ],


    },
    { timestamps: true }
);

module.exports = mongoose.model("Progress", progressSchema);
