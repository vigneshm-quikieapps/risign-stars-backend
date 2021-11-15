const Member = require("../../../models/Member");
const User = require("../../../models/User");
const BusinessSession = require("../../../models/businessSession");
const BusinessClass = require("../../../models/businessClass");


const findUserEmail = async (memberId,sessionId='',classId='') => {
  let member = await Member.findById({_id:memberId});
  let userId = member.userId;
  let userData = await User.findById({_id:userId});
  let email = userData.email;
  let businessSessionData = {};
  let businessClassData = {};
  if(sessionId!=''){
    businessSessionData = await BusinessSession.findById({_id:sessionId});
  }
  if(classId!=''){
    businessClassData = await BusinessClass.findById({_id:classId});
  }

  return {userData,businessSessionData,businessClassData}
};

module.exports = findUserEmail;