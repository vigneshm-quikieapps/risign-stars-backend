const Progress = require("../models/progress");
const { EvaluationScheme, BusinessClass } = require("../models");

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

/**
 *
 * function for progress payload data
 */

const processSkill = (skill) => {
  return { name: skill, status: "NOT_STARTED" };
};

const processLevel = (level) => {
  return { skills: level.skills.map(processSkill), status: "NOT_STARTED" };
};

const genLevelsData = (evaluation) => {
  return evaluation.levels.map(processLevel);
};

const progressPayloadRequest = async (req) => {
  // console.log(req);
  let { memberId, businessId, evaluationId } = req;
  // let { memberId, businessId } = progressData;
  // let businessClass = await BusinessClass.findById(businessId);
  let evaluation = await EvaluationScheme.findById(evaluationId);
  let { levelCount } = evaluation;
  let levels = genLevelsData(evaluation);
  return {
    memberId,
    businessId,
    levelCount,
    levels,
  };
};

//progress creation

module.exports.createProgress = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  let progressPayload = await progressPayloadRequest(req.body);
  const progress = new Progress(progressPayload);
  progress.save((err, progress) => {
    if (err) {
      console.log(err);
      console.log(req.body);

      return res.status(400).json({
        error: "unable to save progress to database",
      });
    }
    res.json(progress);
  });
};

//get a progress record of a member

module.exports.getAProgress = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  try {
    const progress = await Progress.findone({
      memberId: req.body.memberId,
      businessId: req.body.businessId,
    });

    if (!progress) {
      throw new Error("No Progress found");
    }
    res.status(200).json({
      success: true,
      message: "Showing progress record of a member",
      progress: progress,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

/**
 *
 * marking a progress functionality
 */

const markingProgress = async (req, status) => {
  const markedProgressData = await Progress.updateOne(
    {
      _id: req.body.progressId,
      "levels.skills._id": req.body.skillId,
    },
    {
      $set: {
        "levels.$.skills.$[skill].status": status,
      },
    },
    {
      arrayFilters: [
        // { "level.name": req.params.model },
        { "skill._id": req.body.skillId },
      ],
    }
  );

  return markedProgressData;
};

/**
 *
 * marking progress date functionality
 */

const markingProgressDate = async (req, date) => {
  await Progress.updateOne(
    {
      _id: req.body.progressId,
      "levels.skills._id": req.body.skillId,
    },
    {
      $set: {
        "levels.$.skills.$[skill].startedAt": date,
      },
    },
    {
      arrayFilters: [
        // { "level.name": req.params.model },
        { "skill._id": req.body.skillId },
      ],
    }
  );
};

/**
 *
 * marking attained date functionality
 */

const markingAttainedDate = async (req, date) => {
  await Progress.updateOne(
    {
      _id: req.body.progressId,

      "levels.skills._id": req.body.skillId,
    },
    {
      $set: {
        "levels.$.skills.$[skill].completedAt": date,
      },
    },
    {
      arrayFilters: [{ "skill._id": req.body.skillId }],
    }
  );
};

/**
 *
 * mark a skill as progress
 */

module.exports.markAProgress = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  try {
    let message = "";
    if (req.body.status === "IN_PROGRESS") {
      let date = new Date();
      await markingProgressDate(req, date);
      message = await markingProgress(req, "IN_PROGRESS");
    } else {
      let date = new Date();
      await markingAttainedDate(req, date);
      message = await markingProgress(req, "AWARDED");
    }

    if (!message) {
      throw new Error("No progress record");
    }

    res.status(200).json({
      success: true,
      message: "Skill updation successfull",
      progress: message,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

/** code deprecated below this line */

// //pogress listing all

// module.exports.getAllProgress = async (req, res) => {
//   try {
//     const activity = await Progress.find({});

//     if (!activity) {
//       return res
//         .status(200)
//         .json({ success: true, message: "No activity added." });
//     } else {
//       res.status(200).json({
//         success: true,
//         message: "Showing activity...",
//         activity: activity,
//       });
//     }
//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// };

// //pogress listing

// module.exports.getProgress = (req, res) => {
//   return res.json(req.progress);
// };

// //pogress Update

// module.exports.updateProgress = (req, res) => {
//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     return res.status(422).json({
//       error: errors.array()[0].msg,
//     });
//   }

//   Progress.findByIdAndUpdate(
//     { _id: req.progress._id },
//     { $set: req.body }, //$push

//     { new: true, useFindAndModify: false },
//     (err, progress) => {
//       if (err) {
//         return res.status(400).json({
//           err: "you are not ",
//         });
//       }

//       res.json(progress);
//     }
//   );
// };
