const { BusinessClass } = require("../../../models");

const isValidClassId = async (classId) => {
  try {
    let businessClass = await BusinessClass.findById(classId);

    if (!businessClass) {
      throw new Error("Does not exists");
    }

    return true;
  } catch (err) {
    return Promise.reject("invalid class id");
  }
};

module.exports = isValidClassId;
