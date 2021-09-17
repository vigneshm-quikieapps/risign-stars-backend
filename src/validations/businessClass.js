const Business = require("../models/business");
const BusinessSession = require("../models/businessSession");
const Evaluation = require("../models/evaluation");
const Category = require("../models/Category");

module.exports.businessIdValidation = async (businessId) => {
  try {
    if (!businessId) {
      throw new Error();
    }

    let business = await Business.findById(businessId);
    if (!business) {
      throw new Error();
    }

    return true;
  } catch (err) {
    return Promise.reject(`Please select a valid Business`);
  }
};

module.exports.categoryIdValidation = async (category) => {
  try {
    if (!category) {
      throw new Error();
    }

    let categorys = await Category.findById(category);
    if (!categorys) {
      throw new Error();
    }

    return true;
  } catch (err) {
    return Promise.reject(`Please select a valid category`);
  }
};

module.exports.evaluationIdValidation = async (evaluation) => {
  try {
    if (!evaluation) {
      throw new Error();
    }

    let evaluations = await Evaluation.findById(evaluation);
    if (!evaluations) {
      throw new Error();
    }

    return true;
  } catch (err) {
    return Promise.reject(`Please select a valid evaluation`);
  }
};

module.exports.sessionIdValidation = async (session) => {
  try {
    if (!session) {
      throw new Error();
    }

    let sessions = await BusinessSession.findById(session);
    if (!sessions) {
      throw new Error();
    }

    return true;
  } catch (err) {
    return Promise.reject(`Please select a valid session`);
  }
};
