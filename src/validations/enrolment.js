const { body, param } = require("express-validator");
const {
  STATUS_SUSPEND,
  STATUS_ENROLLED,
  STATUS_RETURN_FROM_SUSPENSION,
  ENUM_TRANSFER_NOT_ALLOWED,
} = require("../constants/enrolment");
const { BusinessSession, Member, Enrolment } = require("../models");
const { isValidBusinessId } = require("./helpers/business");
const { isValidMemberId } = require("./helpers/member");

const checkValidSession =
  (dataField) =>
  async (sessionId, { req }) => {
    try {
      let businessSession = await BusinessSession.findById(sessionId);

      if (!businessSession) {
        throw new Error();
      }
      req[dataField] = businessSession;
      return true;
    } catch (err) {
      return Promise.reject(`should be a valid session`);
    }
  };

const isValidSession = async (sessionId, params) => {
  return checkValidSession("businessSessionData")(sessionId, params);
};

/**
 * fieldName is the name of field where the session data in request object
 *
 * FAQ
 * Q1.How to find out the fieldname?
 * Ans:
 * check the previous custom validation stage in the pipeline.
 * check the name of the field where the session data is stored.
 *
 * @param {*} fieldName
 * @returns
 */
const isTrialSessionAllowed =
  (fieldName) =>
  async (_, { req }) => {
    try {
      let sessionData = req[fieldName];

      let trialAllowed = sessionData && sessionData.trialAllowed;

      if (!trialAllowed) {
        throw new Error();
      }
      return true;
    } catch (err) {
      return Promise.reject(`Trial session not available`);
    }
  };

const isValidNewSession = async (newSessionId, params) => {
  return checkValidSession("newSessionData")(newSessionId, params);
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

const isEnroledEnrolment = async (enrolmentId, { req }) => {
  try {
    let { enrolledStatus } = req.enrolmentData;

    /**
     * if the enrolledStatus is either ENROLLED / RETURN FROM SUSPENSION
     * it basically means the enrolledStatus is ENROLLED
     */
    let ENROLLED_STATUS_GROUP = [
      STATUS_ENROLLED,
      STATUS_RETURN_FROM_SUSPENSION,
    ];

    if (!ENROLLED_STATUS_GROUP.includes(enrolledStatus)) {
      throw new Error(
        `enrolment should be in ${ENROLLED_STATUS_GROUP.join(" / ")} status`
      );
    }
  } catch (err) {
    return Promise.reject(err.message);
  }
};

const isSuspendedEnrolment = async (enrolmentId, { req }) => {
  try {
    let { enrolledStatus } = req.enrolmentData;

    if (enrolledStatus !== STATUS_SUSPEND) {
      throw new Error(`enrolment should be in ${STATUS_SUSPEND} status`);
    }
  } catch (err) {
    return Promise.reject(err.message);
  }
};

const isValidEnrolment = async (enrolmentId, { req }) => {
  try {
    let enrolment = await Enrolment.findById(enrolmentId);
    if (!enrolment) {
      throw new Error("should be a valid enrolment");
    }

    req.enrolmentData = enrolment;
    return true;
  } catch (err) {
    return Promise.reject(err.message);
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
    body("memberId", "min length should be 2").custom(isValidMember),
    // body("name", "min length should be 2 and max length should be 70").isLength(
    //   { min: 2, max: 70 }
    // ),
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
  ];
};

const withdrawEnrolmentValidationRules = () => {
  return [
    param("enrolmentId", "min length should be 2").custom(isValidEnrolment),
  ];
};

const suspendEnrolmentValidationRules = () => {
  return [
    param("enrolmentId", "min length should be 2")
      .custom(isValidEnrolment)
      .bail()
      .custom(isEnroledEnrolment),
  ];
};

/**
 * the current status should be SUSPEND
 * then continue
 * else validation error with message `current status should be SUSPEND`
 * @returns
 */
const returnFromSuspensionEnrolmentValidationRules = () => {
  return [
    param("enrolmentId", "min length should be 2")
      .custom(isValidEnrolment)
      .bail()
      .custom(isSuspendedEnrolment),
  ];
};

const updateWaitlistEnrolmentValidationRules = () => {
  return [body("sessionId", "min length should be 2").custom(isValidSession)];
};

/**
 * check if session transfer is allowed
 *
 * if the current enrol status is TRIAL, WAITLISTED, DROPPED or SUSPEND,
 * do not allow session transfer
 *
 * @param {*} _
 * @param {*} param1
 * @returns
 */
const isAllowedToSessionTransfer = async (_, { req }) => {
  try {
    let { enrolledStatus } = req.enrolmentData;
    console.log({ enrolledStatus });

    if (ENUM_TRANSFER_NOT_ALLOWED.includes(enrolledStatus)) {
      throw new Error(
        `session transfer is not allowed for enrolled status: ${enrolledStatus}`
      );
    }

    return true;
  } catch (err) {
    return Promise.reject(err.message);
  }
};

/**
 * check if the session has seats available
 *
 * @param {*} _
 * @param {*} param1
 * @returns
 */
const hasSeatsAvailable = async (_, { req }) => {
  try {
    let { fullcapacity, fullcapacityfilled } = req.newSessionData;

    if (fullcapacityfilled >= fullcapacity) {
      throw new Error("capacity not available in session");
    }

    return true;
  } catch (err) {
    return Promise.reject(err.message);
  }
};

const sessionTransferEnrolmentValidationRules = () => {
  return [
    body("newSessionId", "min length should be 2")
      .custom(isValidNewSession)
      .bail()
      .custom(hasSeatsAvailable),
    body("enrolmentId")
      .custom(isValidEnrolment)
      .bail()
      .custom(isAllowedToSessionTransfer),
  ];
};

const classTransferEnrolmentValidationRules = () => {
  return [param("enrolmentId").custom(isValidEnrolment)];
};

const trialEnrolmentValidationRules = () => {
  return [
    body("sessionId")
      .custom(isValidSession)
      .bail()
      .custom(isTrialSessionAllowed("businessSessionData")),
    body("memberId").custom(isValidMember),
  ];
};

const billsInAnEnrolmentValidationRules = () => {
  return [param("enrolmentId").custom(isValidEnrolment)];
};

const getAllEnrolmentOfAMemberInABusinessValidationRules = () => {
  return [
    body("businessId", "is required").custom(isValidBusinessId),
    body("memberId", "is required").custom(isValidMemberId),
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
  billsInAnEnrolmentValidationRules,
  sessionTransferEnrolmentValidationRules,
  createEnrolementValidationRules,
  classTransferEnrolmentValidationRules,
  getAllEnrolmentOfAMemberInABusinessValidationRules,
  returnFromSuspensionEnrolmentValidationRules,
  suspendEnrolmentValidationRules,
  trialEnrolmentValidationRules,
  updateWaitlistEnrolmentValidationRules,
  withdrawEnrolmentValidationRules,
};
