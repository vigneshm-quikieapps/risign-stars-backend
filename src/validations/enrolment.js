const { body } = require("express-validator");
const { BusinessSession, Member } = require("../models");

const isValidSession = async (sessionId, { req }) => {
  try {
    let businessSession = await BusinessSession.findById(sessionId);
    if (!businessSession) {
      throw new Error();
    }
    req.businessSessionData = businessSession;
    return true;
  } catch (err) {
    return Promise.reject(`should be a valid session`);
  }
};

const isValidMember = async (memberId, { req }) => {
  try {
    let member = await Member.findById(memberId);
    if (!member) {
      throw new Error();
    }
    req.memberData = member;
    return true;
  } catch (err) {
    return Promise.reject(`should be a valid member id`);
  }
};

/**
 * parent is enrolling a member into a session
 *
 * sessionId
 * memberId
 *
 *
 * business admin is enrolling a member into a session
 *
 * sessionId
 * memberId
 *
 * @returns
 */
const createEnrolementValidationRules = () => {
  return [
    body("sessionId", "min length should be 2").custom(isValidSession),
    // body("classId", "min length should be 2").isLength({ min: 2 }),
    // body("businessId", "min length should be 2").isLength({ min: 2 }),
    body("memberId", "min length should be 2").custom(isValidMember),
    // body("name", "min length should be 2 and max length should be 70").isLength(
    //   { min: 2, max: 70 }
    // ),
    // body("clubMembershipId", "min length should be 2").isLength({ min: 2 }),
    body("consent").isObject(),
    body("consent.allergies", "min length should be 2").isLength({
      min: 2,
    }),
    body("consent.condition", "min length should be 2").isLength({
      min: 2,
    }),
    body("consent.photographConsent", "value should be boolean").isBoolean(
      true
    ),
    body("consent.signedByParent", "value should be boolean").isBoolean(true),
    body("newsletter").isObject(),
    body("newsletter.email", "value should be boolean").isBoolean(true),
    body("newsletter.telephone", "value should be boolean").isBoolean(true),
    body("newsletter.sms", "value should be boolean").isBoolean(true),
    // body("startDate", "must be a valid date").isDate().trim(),
    // body("registeredDate", "must be a valid date").isDate().trim(),
    // body("enrolledStatus", "invalid value").isIn(ENUM_ENROLLED_STATUS),
    // body("discontinuationReason", "invalid value").isIn(
    //   ENUM_DISCONTINUATION_REASON
    // ),
    // body("droppedDate", "must be a valid date").isDate().trim(),
    // body("updatedBy", "updatedBy should be a valid userId")
    //   .optional()
    //   .isLength({ min: 12 }),
    // body("createdBy", "createdBy should be a valid userId").isLength({
    //   min: 12,
    // }),
  ];
};

const updateWaitlistEnrollment = () => {
  return [body("sessionId", "min length should be 2").isLength({ min: 2 })];
};

const classTransferValidation = () => {
  return [
    body("newSessionId", "min length should be 2").isLength({ min: 2 }),
    body("currentSessionId", "min length should be 2").isLength({ min: 2 }),
    body("memberId", "min length should be 2").isLength({ min: 2 }),
    // body("classId", "min length should be 2").isLength({ min: 2 }),
    createEnrolementValidationRules(),
  ];
};

// const putEnrolementConsentValidationRules = () => {
//   return [
//     body("consent").isObject(),
//     body("consent.allergies", "min length should be 2").isLength({
//       min: 2,
//     }),
//     body("consent.condition", "min length should be 2").isLength({
//       min: 2,
//     }),
//     body("consent.photographConsent", "value should be boolean").isBoolean(
//       true
//     ),
//     body("consent.signedByParent", "value should be boolean").isBoolean(true),
//   ];
// };
// const putEnrolementAdditionalValidationRules = () => {
//   return [
//     body("newsletter").isObject(),
//     body("newsletter.email", "value should be boolean").isBoolean(true),
//     body("newsletter.telephone", "value should be boolean").isBoolean(true),
//     body("newsletter.sms", "value should be boolean").isBoolean(true),
//   ];
// };
module.exports = {
  createEnrolementValidationRules,
  updateWaitlistEnrollment,
  classTransferValidation,
};
