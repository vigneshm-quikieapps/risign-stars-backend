const { BusinessClass } = require("../../../models");

const isValidClassId = async (classId, { req }) => {
  try {
    let businessClass = await BusinessClass.findById(classId);

    if (!businessClass) {
      throw new Error("Does not exists");
    }

    req.classData = businessClass;

    return true;
  } catch (err) {
    return Promise.reject("should be a valid class Id");
  }
};

module.exports = isValidClassId;
