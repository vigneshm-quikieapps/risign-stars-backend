const enrolement = require("../models/enrolement");
const BusinessSession = require("../models/businessSession")
const Progress = require("../models/progress");

const { createProgress } = require("../controllers/progress")


const enrollmentPayloadRequest = (data) => {
  return{
    // id: data.id,
    sessionId: data.sessionId,
    classId: data.classId,
    businessId: data.businessId,
    name: data.name,
    memberId: data.memberId,
    clubMembershipId: data.clubMembershipId,
    consent:data.consent,
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
  
  }
}


const enrollmentPayloadRequest = (data) => {
  return{
    studentId: data.studentId,
    studentName: data.studentName,
    sessionId: data.sessionId,
    classId: data.classId,
    className: data.className,
    // evaluationScheme: EvaluationScheme,
    levelCount: data.levelCount,
    levels: data.levels
  }
}

//createMember(Enrollement)
module.exports.create= async (req, res) => {

  const session = await mongoose.startSession();

  session.startTransaction();

  try {

    const businessSessiondata = await BusinessSession.findOne({_id: req.body.sessionId}).session(session)

    let totalCapacity = businessSessiondata.sessionCapacity + businessSessiondata.waitlistCapacity
    let totalEnrollment = businessSessiondata.sessionEnrolled + businessSessiondata.waitlistEnrolled

    if(totalCapacity <= totalEnrollment){

      return res.status(201).send({ message: "Maximum limit of enrollment is reached."})

    }else if(businessSessiondata.sessionEnrolled !== businessSessiondata.sessionCapacity){

      // creating enrollment till session capacity

      const createEnrollmentData = enrollmentPayloadRequest(req.body)

      let member = await enrolement.create(
        {
          ...createEnrollmentData,
          enrolledStatus: "ENROLLED",
          discontinuationReason: "NONE"
        }
      ).session(session)

      // creating progress Record 

      const createProgressData = enrollmentPayloadRequest(req.body)

      createProgress(createProgressData).session(session)


      // increment session enrolled in business session

      await BusinessSession.findByIdAndUpdate(
        { _id: req.body.sessionId },
        { $inc: { "sessionEnrolled" : 1 } }
      ).session(session)

      return res.status(201).send({ message: "enrolled Successfully", member })

    }else if(business.waitlistCapacity !== business.waitlistEnrolled && business.sessionEnrolled > business.sessionCapacity){

      // creating enrollment till session capacity

      const createEnrollmentData = payloadRequest(req.body)

      let member = await enrolement.create(
        {
          ...createEnrollmentData,
          enrolledStatus: "WAITLISTED",
          discontinuationReason: "NONE"
        }
      ).session(session)


      // increment waitlist enrolled in business session

      await BusinessSession.findByIdAndUpdate(
        { _id: req.body.sessionId },
        { $inc: { "waitlistEnrolled" : 1 } }
      ).session(session)

      return res.status(201).send({ message: "enrolled Successfully", member })
    }

  } catch (err) {
    console.error(err);
    return res.status(422).send({ message: err.message });
  }
};


//getAllMember
  module.exports.getAll= async (req, res) => {
    try {
        let users = await  enrolement.find({});
        return res.send({ users });
      } catch (err) {
        console.error(err);
        return res.status(422).send({ message: err.message });
      }
  };


//updateSpecificMemberConsent
  module.exports.updateConsent= async (req, res) => {
    try {
    
      let options = { new: true };
      console.log(req.params.id)
      let student = await enrolement.findByIdAndUpdate(req.params.id, req.body, options);
      if (!student) {
          throw new DoesNotExistException();
      }
      return res.send({ message: "updated successfully", student });
  } catch (err) {
      console.error(err);
      return res.status(422).send({ message: err.message });
  }
  };


//getSpecificMember'sConsent
  module.exports.getConsent= async (req, res) => {
    try {
        let users = await  enrolement.findById(req.params.id);
        return res.send({ users:users.consent });
      } catch (err) {
        console.error(err);
        return res.status(422).send({ message: err.message });
      }
  };



//updateSpecificMemberAdditionalSection
module.exports.updateAdditionalSection= async (req, res) => {
  try {
  
    let options = { new: true };
    console.log(req.params.id)
    let student = await enrolement.findByIdAndUpdate(req.params.id, req.body, options);
    if (!student) {
        throw new DoesNotExistException();
    }
    return res.send({ message: "updated successfully", student });
} catch (err) {
    console.error(err);
    return res.status(422).send({ message: err.message });
}
};



//getSpecificMember'sAdditionalSection
module.exports.getAdditionalSection= async (req, res) => {
  try {
      let users = await  enrolement.findById(req.params.id);
      return res.send({ users:users.newsletter });
    } catch (err) {
      console.error(err);
      return res.status(422).send({ message: err.message });
    }
};


