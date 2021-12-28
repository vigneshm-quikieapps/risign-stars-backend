const { Enrolment } = require("../../models");

const getEnrolmentById = async (req, res,next) => {
  try {
    let { enrolmentId } = req.params;
    let enrolment = await Enrolment.find({ _id:enrolmentId })
      .populate("business")
      .populate("class")
      .populate("session");
    return res.send({ enrolment });
  } catch (err) {
    return res.send({ message: err.message });
  }
};



module.exports = getEnrolmentById;
