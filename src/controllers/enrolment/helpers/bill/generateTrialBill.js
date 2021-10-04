const { PAY_FREQUENCY_TRIAL } = require("../../../../contants/business");
const { BusinessClass, Bill } = require("../../../../models");

const generateTrialBill = async (req, session) => {
  let { memberId } = req.body;
  let { businessSessionData } = req;
  let { businessId, classId } = businessSessionData;

  let businessClass = await BusinessClass.findById(classId);

  let trialCharge = businessClass.charges.find(
    (charge) => charge.payFrequency === PAY_FREQUENCY_TRIAL
  );

  if (!trialCharge) {
    throw new Error("Trial charge is not available");
  }

  let subtotal = trialCharge.amounts;
  let discount = 0;
  let total = subtotal - discount;

  let billPayload = {
    memberId,
    businessId,
    classId,
    items: [
      {
        description: trialCharge.name,
        amount: trialCharge.amount,
      },
    ],
    subtotal,
    discount,
    total,
    dueDate: new Date(),
  };

  await Bill.create([billPayload], session);
};

module.exports = generateTrialBill;
