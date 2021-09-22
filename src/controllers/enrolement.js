const enrolement = require("../models/enrolement");
const BusinessSession = require("../models/businessSession");
const Progress = require("../models/progress");
const mongoose = require("mongoose");

const { createProgress } = require("../controllers/progress");

const enrollmentPayloadRequest = (data) => {
  return {
    // id: data.id,
    sessionId: data.sessionId, 
    classId: data.classId,
    businessId: data.businessId,
    name: data.name,
    memberId: data.memberId,
    clubMembershipId: data.clubMembershipId,
    consent: data.consent,
    newsletter: data.newsletter,
    startDate: data.startDate,
    registeredDate: data.registeredDate,
    
    // enrolledStatus: {
    //   type: String,
    //   enum: ENUM_ENROLLED_STATUS
    // },
    // discontinuationReason: {
    //   type: String,
    //   enum: ENUM_DISCONTINUATION_REASON
    // },
    // droppedDate: Date,
  };
};

const progressPayloadRequest = (data) => {
  return {
    studentId: data.studentId,
    studentName: data.studentName,
    sessionId: data.sessionId,
    classId: data.classId,
    className: data.className,
    levelCount: data.levelCount,
    levels: data.levels,
  };
};


const classTransferEnrollmentPayloadRequest = (data) => {
  return {
    sessionId: data.newSessionId, 
    classId: data.classId,
    businessId: data.businessId,
    name: data.name,
    memberId: data.memberId,
    clubMembershipId: data.clubMembershipId,
    consent: data.consent,
    newsletter: data.newsletter,
    startDate: data.startDate,
    registeredDate: data.registeredDate,

  };
};

const classTransferprogressPayloadRequest = (data) => {
  return {
    studentId: data.studentId,
    studentName: data.studentName,
    sessionId: data.newSessionId,
    classId: data.classId,
    className: data.className,
    levelCount: data.levelCount,
    levels: data.levels,
  };
};


async function enrollment(bodyData, session) {
  // creating enrollment till session capacity

  const createEnrollmentData = enrollmentPayloadRequest(bodyData);

  await enrolement
    .create({
      ...createEnrollmentData,
      enrolledStatus: "ENROLLED",
      discontinuationReason: "NONE",
    })
    .session(session);

  // creating progress Record

  const createProgressData = progressPayloadRequest(bodyData);

  createProgress(createProgressData).session(session);

  // increment session enrolled in business session

  await BusinessSession.findByIdAndUpdate(
    { _id: bodyData.sessionId },
    { $inc: { fullcapacityfilled: 1 } }
  ).session(session);
}


async function waitlistEnrollment(bodyData, session) {
  // creating enrollment till session capacity

  const createEnrollmentData = await enrollmentPayloadRequest(bodyData);

  await enrolement
    .create({
      ...createEnrollmentData,
      enrolledStatus: "WAITLISTED",
      discontinuationReason: "NONE",
    })
    .session(session);

  // increment waitlist enrolled in business session

  await BusinessSession.findByIdAndUpdate(
    { _id: req.body.sessionId },
    { $inc: { waitcapacityfilled: 1 } }
  ).session(session);
}


async function classTransferfunctionality(bodyData, session){

  await enrolement
    .findOneAndUpdate(
      { _id: bodyData.memberId, sessionId: bodyData.currentSessionId, classId: bodyData.classId },
      {
        $set: {
          enrolledStatus: "DROPPED",
          discontinuationReason: "CLASS_TRANSFER",
        },
      }
    )
    .session(session);


  const createEnrollmentData = classTransferEnrollmentPayloadRequest(bodyData);

  await enrolement
    .create({
      ...createEnrollmentData,
      enrolledStatus: "ENROLLED",
      discontinuationReason: "NONE",
    })
    .session(session);

  // creating progress Record

  const createProgressData = classTransferprogressPayloadRequest(bodyData);

  createProgress(createProgressData).session(session);

  // increment session enrolled in business session

  await BusinessSession.findByIdAndUpdate(
    { _id: bodyData.newSessionId },
    { $inc: { fullcapacityfilled: 1 } }
  ).session(session);

  await BusinessSession.findOneAndUpdate(
    { _id: bodyData.currentSessionId },
    {
      $inc: { fullcapacityfilled: -1 },
    }
  ).session(session);
}


//createMember(Enrollement)
module.exports.createEnrollment = async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    const businessSessiondata = await BusinessSession.findOne({
      _id: req.body.sessionId,
    }).session(session);

    let totalCapacity =
      businessSessiondata.fullcapacity + businessSessiondata.waitcapacity;
    let totalEnrollment =
      businessSessiondata.fullcapacityfilled +
      businessSessiondata.waitcapacityfilled;

    if (totalCapacity <= totalEnrollment) {
      return res
        .status(201)
        .send({ message: "Maximum limit of enrollment is reached." });
    } else if (
      businessSessiondata.fullcapacityfilled <=
      businessSessiondata.fullcapacity
    ) {
      const member = await enrollment(req.body, session);

      if (member) {
        return res
          .status(201)
          .send({ message: "enrolled Successfully", member });
      }
    } else {
      // creating enrollment till session capacity

      let member = await waitlistEnrollment(req.body, session)

      await session.commitTransaction();

      console.log("success");

      return res.status(201).send({ message: "enrolled Successfully", member });
    }
  } catch (err) {
    console.log("error");
    await session.abortTransaction();
    return res.status(422).send({ message: err.message });
  } finally {
    session.endSession();
  }
};



// cancel Membership
module.exports.cancelMembership = async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    await enrolement
      .findOneAndUpdate(
        { memberId: req.body.memberId, sessionId: req.body.sessionId },
        {
          $set: {
            enrolledStatus: "DROPPED",
            discontinuationReason: "DROPPED",
          },
        }
      )
      .session(session);

    await BusinessSession.findOneAndUpdate(
      { sessionId: req.body.sessionId },
      {
        $inc: { "fullcapacityfilled": -1 },
      }
    ).session(session);

    await session.commitTransaction();

    console.log("success");

    return res.status(201).send({ message: "cancellation successfull" });
  } catch (err) {
    console.log("error");
    await session.abortTransaction();
    return res.status(422).send({ message: err.message });
  } finally {
    session.endSession();
  }
};



// update Enrollment for waitlist
module.exports.updateEnrollmentWaitlist = async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  try {


    const businessSessiondata = await BusinessSession
      .findOne({_id: req.body.sessionId})
      .session(session);

    let capacityLeft = businessSessiondata.fullcapacity - businessSessiondata.fullcapacityfilled

    let updatedEnrollemnt = await enrolement
      .updateMany({ enrolledStatus: "WAITLISTED" })
      .limit(capacityLeft)
      .session(session);

    let createDocumentProgress = updatedEnrollemnt.map(li => {
      return(
        li.name,
        li.sessionId,
        li.classId,
        li.memberId
      )
    })

    await Progress.insertMany(createDocumentProgress).session(session)

    await BusinessSession.findOneAndUpdate(
      { sessionId: req.body.sessionId },
      {
        $inc: {
          "fullcapacityfilled": capacityLeft,
          "waitcapacityfilled": -capacityLeft
        }
      }
    ).session(session);
  

    await session.commitTransaction();

    console.log("success");

    /** comment this because member is not defined due to commenting the above code. */
    // return res.status(201).send({ message: "enrolled Successfully", member });
  } catch (err) {
    console.log("error");
    await session.abortTransaction();
    return res.status(422).send({ message: err.message });
  } finally {
    session.endSession();
  }
};



// class transfer
module.exports.classTransfer = async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction(); 

  try {
    const newBusinessSessiondata = await BusinessSession.findOne({
      _id: req.body.SessionId,
    }).session(session);

    if ( newBusinessSessiondata.fullcapacity > newBusinessSessiondata.fullcapacityfilled) {

      await classTransferfunctionality(req.body, session)
    }

    await session.commitTransaction();

    console.log("success");

    return res.status(201).send({ message: "enrolled Successfully"});
  } catch (err) {
    console.log("error");
    await session.abortTransaction();
    return res.status(422).send({ message: err.message });
  } finally {
    session.endSession();
  }
};





/////////////////////////////////////////// Below this line deprecated ////////////////////////////////////////////////

// //getAllMember
//   module.exports.getAll= async (req, res) => {
//     try {
//         let users = await  enrolement.find({});
//         return res.send({ users });
//       } catch (err) {
//         console.error(err);
//         return res.status(422).send({ message: err.message });
//       }
//   };

// //updateSpecificMemberConsent
//   module.exports.updateConsent= async (req, res) => {
//     try {

//       let options = { new: true };
//       console.log(req.params.id)
//       let student = await enrolement.findByIdAndUpdate(req.params.id, req.body, options);
//       if (!student) {
//           throw new DoesNotExistException();
//       }
//       return res.send({ message: "updated successfully", student });
//   } catch (err) {
//       console.error(err);
//       return res.status(422).send({ message: err.message });
//   }
//   };

// //getSpecificMember'sConsent
//   module.exports.getConsent= async (req, res) => {
//     try {
//         let users = await  enrolement.findById(req.params.id);
//         return res.send({ users:users.consent });
//       } catch (err) {
//         console.error(err);
//         return res.status(422).send({ message: err.message });
//       }
//   };

// //updateSpecificMemberAdditionalSection
// module.exports.updateAdditionalSection= async (req, res) => {
//   try {

//     let options = { new: true };
//     console.log(req.params.id)
//     let student = await enrolement.findByIdAndUpdate(req.params.id, req.body, options);
//     if (!student) {
//         throw new DoesNotExistException();
//     }
//     return res.send({ message: "updated successfully", student });
// } catch (err) {
//     console.error(err);
//     return res.status(422).send({ message: err.message });
// }
// };

// //getSpecificMember'sAdditionalSection
// module.exports.getAdditionalSection= async (req, res) => {
//   try {
//       let users = await  enrolement.findById(req.params.id);
//       return res.send({ users:users.newsletter });
//     } catch (err) {
//       console.error(err);
//       return res.status(422).send({ message: err.message });
//     }
// };

// //update registration
// module.exports.updateRegistration= async (req, res) => {
//   try {
//      let users = await  enrolement.findById(req.params.enrolementId);
//      if(!users){
//        throw new Error()
//      }
//     let options = { new: true };

//     let student = await enrolement.findByIdAndUpdate(req.params.enrolementId,{"discontinuationReason":"CLASS_TRANSFER"}, options);

//       return res.send({"updatedenrolement":student});
//     } catch (err) {

//       return res.status(422).send({ message: err.message });
//   }
//     next();

// };
// module.exports.updateSessionCapacity= async (req, res,next) => {
//   try {
//      let session = await  BusinessSession.findById(req.params.sessionId);
//      if(!session){
//        throw new Error("")
//      }
//     let options = { new: true };
//    if(session.fullcapacityfilled=0){
//        throw new Error("session is already zero")
//      }
//     let student = await BusinessSession.findByIdAndUpdate(req.params.sessionId,{"fullcapacityfilled":session.fullcapacityfilled-1}, options);

//     return res.send({ "updatedenrolement": student });

//     } catch (err) {

//       return res.status(422).send({ message: err.message });
//   }
//     next();

// };
