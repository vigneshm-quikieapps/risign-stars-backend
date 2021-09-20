const Progress = require("../models/progress");

const { validationResult } = require("express-validator");

//pogress extractor
module.exports.getProgressIdById = (req, res, next, id) => {
    Progress.findById(id).exec((err, progress) => {
        if (err) {
            return res.status(400).json({
                err: "cannot find progress by id",
            });
        }
        req.progress = progress;
        next();
    });
};

//pogress creation

module.exports.createProgress = async(data, session) => {
    // const errors = validationResult(req);

    // if (!errors.isEmpty()) {
    //     return res.status(422).json({
    //         error: errors.array()[0].msg,
    //     });
    // }
    const progress = new Progress(data);
    await progress.save().session(session)
    // progress.save((err, progress) => {
    //     if (err) {
    //         console.log(err);
    //         console.log(req.body);

    //         return res.status(400).json({
    //             error: "unable to save progress to database",
    //         });
    //     }
    //     res.json(progress);
    // });
};

//pogress listing all

module.exports.getAllProgress = async (req, res) => {
    try {
        const activity = await Progress.find({});

        if (!activity) {
            return res
                .status(200)
                .json({ success: true, message: "No activity added." });
        } else {
            res.status(200).json({
                success: true,
                message: "Showing activity...",
                activity: activity,
            });
        }
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }

};


//pogress listing

module.exports.getProgress = (req, res) => {
    return res.json(req.progress);
};

//pogress Update

module.exports.updateProgress = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
        });
    }

    Progress.findByIdAndUpdate(
        { _id: req.progress._id },
        { $set: req.body }, //$push

        { new: true, useFindAndModify: false },
        (err, progress) => {
            if (err) {
                return res.status(400).json({
                    err: "you are not ",
                });
            }

            res.json(progress);
        }
    );
};

//push new attendence ink progress

module.exports.addAttendence = (req, res) => {
    // const errors = validationResult(req);

    // if (!errors.isEmpty()) {
    //     return res.status(422).json({
    //         error: errors.array()[0].msg,
    //     });
    // }

    Progress.findByIdAndUpdate(
        { _id: req.progress._id },
        { $push:{ attend:req.body} }, 

        { new: true },
        (err, progress) => {
            if (err) {
                return res.status(400).json({
                    err: "you are not able to add attend ",
                });
            }

            res.json(progress);
        }
    );
};









