const { Enrolment } = require("../../models");

const getAllEnrolmentOfAMember = async (req, res) => {
  try {
    let { memberId } = req.params;
    let enrolments = await Enrolment.find({ memberId })
      .populate("business")
      .populate("class")
      .populate({
        path: "session",
        populate: {
          path: "coachId",
        },
      });
    return res.send({ enrolments });
  } catch (err) {
    return res.send({ message: err.message });
  }
};

module.exports = getAllEnrolmentOfAMember;
