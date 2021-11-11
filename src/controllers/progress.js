const { validationResult } = require("express-validator");
const Progress = require("../models/progress");
const { Member } = require("../models");
const {
  PROGRESS_IN_PROGRESS,
  PROGRESS_AWARDED,
  PROGRESS_NOT_STARTED,
} = require("../constants/progress");
const { Types } = require("mongoose");
const { getPaginationOptions } = require("../helpers/query");
const { auditCreatedBy } = require("../helpers/audit");

//pogress extractor
// module.exports.getProgressIdById = (req, res, next, id) => {
//   Progress.findById(id).exec((err, progress) => {
//     if (err) {
//       return res.status(400).json({
//         err: "cannot find progress by id",
//       });
//     }
//     req.progress = progress;
//     next();
//   });
// };

module.exports.getAllProgressOfAMember = async (req, res) => {
  try {
    let { memberId } = req.params;

    let { query, options } = getPaginationOptions(req);
    query = { query, memberId };

    let response = await Progress.paginate(query, options);
    return res.send(response);
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
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
  let { memberId, clubMembershipId, businessId, evaluationSchemeId } = req.body;

  let { evaluationSchemeData } = req;
  let { levelCount } = evaluationSchemeData;
  let levels = genLevelsData(evaluationSchemeData);
  return {
    memberId,
    clubMembershipId,
    evaluationSchemeId,
    businessId,
    levelCount,
    levels,
  };
};

/**
 * if progress record is available
 * just return it
 * if not available
 * create a new progress record and then return the record
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
module.exports.createOrGetProgress = async (req, res) => {
  try {
    let { clubMembershipId, evaluationSchemeId, businessId, memberId } =
      req.body;

    /**
     * validate if the combination of clubmembership and businessId is valid
     */
    let member = await Member.findOne({
      _id: memberId,
      "membership.businessId": businessId,
      "membership.clubMembershipId": clubMembershipId,
    });

    if (!member) {
      throw new Error("No progress record as member doesn't exist");
    }

    /** check if progress record already exists */
    let progress = await Progress.findOne({
      clubMembershipId,
      evaluationSchemeId,
      businessId,
    });

    /**
     * if progress record is not available, create it
     */
    if (!progress) {
      let progressPayload = await progressPayloadRequest(req);
      progressPayload = auditCreatedBy(req, progressPayload);
      progress = await Progress.create(progressPayload);
    }

    return res.send({ progress });
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
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

    if (message.matchedCount <= 0) {
      throw new Error("skill not found");
    }

    return res.status(200).json({
      message: "Skill updation successfull",
    });
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

/**
 * generated update payload for progress marking in bulkwrite
 *
 * @param {*} param0
 * @returns
 */
const genUpdateForMultipleProgressMarking = ({ status, now }) => {
  let update;
  switch (status) {
    case PROGRESS_AWARDED:
      update = {
        $set: {
          "levels.$[level].skills.$[skill].status": status,
          "levels.$[level].skills.$[skill].completedAt": now,
        },
      };
      return update;

    case PROGRESS_IN_PROGRESS:
      update = {
        $set: {
          "levels.$[level].skills.$[skill].status": status,
          "levels.$[level].skills.$[skill].startedAt": now,
        },
        $unset: {
          "levels.$[level].skills.$[skill].completedAt": "",
        },
      };
      return update;

    default:
      update = {
        $set: {
          "levels.$[level].skills.$[skill].status": status,
        },
        $unset: {
          "levels.$[level].skills.$[skill].startedAt": "",
          "levels.$[level].skills.$[skill].completedAt": "",
        },
      };
      return update;
  }
};

/**
 * endpoint for: multiple marking of progress skill status
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
module.exports.multipleProgressMarking = async (req, res) => {
  try {
    let { progressId } = req.body;
    let skillsData = [...req.body.skills];
    let now = new Date();

    let bulkWritePayloadArr = skillsData.map(({ levelId, skillId, status }) => {
      let update = genUpdateForMultipleProgressMarking({
        status,
        now,
      });

      return {
        updateOne: {
          filter: {
            _id: progressId,
          },
          update,
          arrayFilters: [
            { "level._id": Types.ObjectId(levelId) },
            { "skill._id": Types.ObjectId(skillId) },
          ],
        },
      };
    });

    let response = await Progress.bulkWrite(bulkWritePayloadArr, {
      ordered: false,
    });

    return res.send({ message: "updated successful", response });
  } catch (err) {
    console.error(err);
    return res.status(422).send({ message: err.message });
  }
};
