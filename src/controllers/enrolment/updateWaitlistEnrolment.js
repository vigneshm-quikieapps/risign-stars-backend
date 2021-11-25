const mongoose = require("mongoose");
const { BusinessSession, Enrolment,Member,BusinessClass,BusinessFinance,MemberConsent} = require("../../models");
const { generateEnrolmentBill } = require("../../helpers/bill");
const { findUserEmail } = require("../../helpers/user/findUserEmail");
const { UpdateWaitListEnrolment } = require("../../services/notification/Email");

// update enrolment for waitlist
const updateWaitlistEnrolment = async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    let { memberId, isTrialEnrolment,sessionId,consent, newsletter  } = req.body;
    const businessSessiondata = await BusinessSession.findOne({
      _id: req.body.sessionId,
    }).session(session);
    let { classId } = businessSessiondata;
    

    let capacityLeft = businessSessiondata.fullcapacity - businessSessiondata.fullcapacityfilled;
    if(capacityLeft>0){
      
      let updatedEnrollemnt = await Enrolment.findOneAndUpdate(
        {sessionId:req.body.sessionId,memberId:req.body.memberId,enrolledStatus:'WAITLISTED'},
        {enrolledStatus: "ENROLLED"},
        {
          new: true
        }
      );
      if(updatedEnrollemnt){
        let {clubMembershipId,businessId} = updatedEnrollemnt;

        let consentFilter = { clubMembershipId };
        let consentUpdate = {
          businessId,
          memberId,
          clubMembershipId,
          consent,
          newsletter,
        };
        let consentOption = {
          new: true,
          upsert: true,
        };
        await MemberConsent.findOneAndUpdate(
          consentFilter,
          consentUpdate,
          consentOption
        ).session(session);
      
        await BusinessSession.findOneAndUpdate(
            { sessionId: req.body.sessionId },
            {
              $inc: { 
                fullcapacityfilled: 1, 
                waitcapacityfilled: -1
              }
            }
        ).session(session);
        let businessFinanceData = await BusinessFinance.findOne({
          businessId: Types.ObjectId(businessId),
        });

        let classData = await BusinessClass.findById(classId);
        let memberData = await Member.findById(memberId);
        let sessionData=businessSessiondata;
        let enrolmentBillData = {
          businessFinanceData,
          classData,
          sessionData,
          memberData,
          clubMembershipId,
        };
        await generateEnrolmentBill(enrolmentBillData, session);
        let {userData,businessSessionData,businessClassData} = await findUserEmail(memberId);
        businessSessionData=sessionData;
        businessClassData=classData;
        let {email}=userData;
        UpdateWaitListEnrolment.send({to:email},{userData,businessSessionData,businessClassData});
        await session.commitTransaction();
        return res.status(201).send({ message:'enrolled successful!' });
      }else{
        throw new Error("User is not in waitlist");
      }
    }else{
      throw new Error("Cannot be enrolled beacause maximum limit of enrolment is reached");
    }


    /** comment this because member is not defined due to commenting the above code. */
    // return res.status(201).send({ message: "enrolled Successfully", member });
  }catch (err) {
    console.log("error");
    await session.abortTransaction();
    return res.status(422).send({ message: err.message });
  } finally {
    session.endSession();
  }
};

module.exports = updateWaitlistEnrolment;
