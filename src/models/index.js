const Bill = require("./Bill");
const Business = require("./business");
const BusinessClass = require("./businessClass");
const BusinessSession = require("./businessSession");
const BusinessFinance = require("./businessFinance");
const Category = require("./Category");
const Counter = require("./Counter");
const Discounts = require("./discounts");
const Enrolment = require("./Enrolment");
const EvaluationScheme = require("./evaluationScheme");
const Member = require("./Member");
const MemberConsent = require("./MemberConsent");
const Progress = require("./progress");
const Role = require("./Role");
const Term = require("./Term");
const User = require("./User");
const Xlsx = require("./Xlsx");
const {
  AttendanceOfAClassByDate,
  AttendanceOfAClassByMonth,
  AttendanceOfAMemberInAClass,
} = require("./attendanceManagement");

module.exports = {
  AttendanceOfAClassByDate,
  AttendanceOfAClassByMonth,
  AttendanceOfAMemberInAClass,
  Bill,
  Business,
  BusinessClass,
  BusinessSession,
  BusinessFinance,
  Category,
  Counter,
  Discounts,
  Enrolment,
  EvaluationScheme,
  Member,
  MemberConsent,
  Progress,
  Role,
  Term,
  User,
  Xlsx,
};
