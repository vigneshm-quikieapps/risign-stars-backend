const { PAY_FREQUENCY_TRIAL } = require("../../constants/business");
const { BusinessClass, Bill } = require("../../models");

/**
 * generate bill for trial enrolment
 *
 * @param {*} req
 * @param {*} session
 */
const generateTrialBill = async (req, session) => {
  let { memberId } = req.body;
  let { businessSessionData } = req;
  let { businessId, classId } = businessSessionData;

  /** get the trial charge */
  let businessClass = await BusinessClass.findById(classId);
  let trialCharge = businessClass.charges.find(
    (charge) => charge.payFrequency === PAY_FREQUENCY_TRIAL
  );

  if (!trialCharge) {
    throw new Error("Trial charge is not available");
  }

  /** Bill payload */
  let now = new Date();
  let subtotal = trialCharge.amount;
  let discount = 0;
  let total = subtotal - discount;

  let billPayload = {
    memberId,
    businessId,
    classId,
    items: [
      {
        name: trialCharge.name,
        amount: trialCharge.amount,
      },
    ],
    subtotal,
    discount,
    total,
    dueDate: now,
    billDate: now,
  };

  await Bill.create([billPayload], session);
};

module.exports = generateTrialBill;
