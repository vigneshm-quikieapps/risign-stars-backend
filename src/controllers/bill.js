const { Bill, Enrolment, BusinessSession } = require("../models");
const {
  getQuery,
  getOptions,
  getPaginationOptions,
} = require("../helpers/query");
const { PAYMENT_METHOD_MANUAL } = require("../constants/bill");
const { ENUM_TRANSFER_ALLOWED } = require("../constants/enrolment");
const mongoose = require("mongoose");
const { ObjectId } = require("mongoose").Types;

module.exports.getAll = async (req, res) => {
  try {
    let query = getQuery(req);
    let options = getOptions(req);
    let response = await Bill.paginate(query, options);
    return res.send(response);
  } catch (err) {
    return res.send({ message: err.message });
  }
};

module.exports.billsOfAMemberInAClass = async (req, res) => {
  try {
    let query = getQuery(req);
    let { memberId, classId } = req.body;
    query = { ...query, memberId, classId };
    let options = getOptions(req);

    let response = await Bill.paginate(query, options);
    return res.send(response);
  } catch (err) {
    return res.send({ message: err.message });
  }
};

module.exports.billsOfAMemberInABusiness = async (req, res) => {
  try {
    let query = getQuery(req);
    let { memberId, businessId } = req.body;
    query = { ...query, memberId, businessId };
    let options = getOptions(req);

    let response = await Bill.paginate(query, options);
    return res.send(response);
  } catch (err) {
    return res.send({ message: err.message });
  }
};

// module.exports.enterTransaction = async (req, res) => {
//   try {
//     let { billId, reference, type } = req.body;
//     let now = new Date();

//     let update = {
//       $set: {
//         reference,
//         method: PAYMENT_METHOD_MANUAL,
//         type,
//         paidAt: now,
//       },
//     };
//     let options = { new: true, useFindAndModify: false };

//     let bill = await Bill.findByIdAndUpdate(billId, update, options);

//     return res.send({ message: "transaction recorded", bill });
//   } catch (err) {
//     return res.status(422).send({ message: err.message });
//   }
// };

module.exports.enterTransaction = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    let { billId, reference, type, amount } = req.body;
    let now = new Date();
    let billData = await Bill.findById(billId);
    let transactionArray = [];
    if (billData.partialTransactions.length == 0) {
      if (amount <= billData.subtotal) {
        let partialObj = {
          "amount":amount,
          "reference":reference,
          "method":PAYMENT_METHOD_MANUAL,
          "transactionType":type,
          "paidAt":now,
          "updateMethod":PAYMENT_METHOD_MANUAL,
          "processDate":now
        };
        transactionArray.push(partialObj);
        let update = {
          $set: {
            partialTransactions: transactionArray,
          },
        };
        let options = { new: true, useFindAndModify: false };

        let bill = await Bill.findByIdAndUpdate(
          billId,
          update,
          options
        ).session(session);
        await session.commitTransaction();

        return res.send({ message: "transaction recorded", bill });
      } else {
        throw new Error("Transaction amount is greater than sub total");
      }
    } else {
      let totalSum = 0;
      for (let i = 0; i < billData.partialTransactions.length; i++) {
        totalSum += billData.partialTransactions[i].amount;
      }
      let diff = billData.subtotal - totalSum;
      if (totalSum < billData.subtotal && amount <= diff) {
        let partialObj = {
          "amount":amount,
          "reference":reference,
          "method":PAYMENT_METHOD_MANUAL,
          "transactionType":type,
          "paidAt":now,
          "updateMethod":PAYMENT_METHOD_MANUAL,
          "processDate":now
        };
        transactionArray = billData.partialTransactions;
        transactionArray.push(partialObj);
        let update = {
          $set: {
            partialTransactions: transactionArray,
          },
        };
        let options = { new: true, useFindAndModify: false };

        let bill = await Bill.findByIdAndUpdate(
          billId,
          update,
          options
        ).session(session);
        await session.commitTransaction();

        return res.send({ message: "transaction recorded", bill });
      } else {
        throw new Error("No due left cannot record this transaction");
      }
    }

  } catch (err) {
    await session.abortTransaction();
    return res.status(422).send({ message: err.message });
  } finally {
    session.endSession();
  }
};

module.exports.deleteTransactions = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    let { billId, transactionId } = req.body;
    let billData = await Bill.findById(billId);
    if (billData) {
      if (billData.partialTransactions) {
        let { partialTransactions } = billData;
        let newTransactions = partialTransactions.filter((transaction) => {
          return transaction._id != transactionId;
        });
        let update = {
          $set: {
            partialTransactions: newTransactions,
          },
        };
        let options = { new: true, useFindAndModify: false };

        let bill = await Bill.findByIdAndUpdate(
          billId,
          update,
          options
        ).session(session);
        await session.commitTransaction();
        return res.send({ message: "transaction deleted", bill });
      }
    }
  } catch (err) {
    await session.abortTransaction();
    return res.status(422).send({ message: err.message });
  } finally {
    session.endSession();
  }
};

module.exports.updateTransactions = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    let { billData } = req.body;
    if (billData.length > 0) {
      let updatedBillTransactions = [];
      for (let i = 0; i < billData.length; i++) {
        let { billId } = billData[i];
        // find the bill by bill id from bill data body object
        let bill = await Bill.findById(billId);
        if (bill) {
          if (bill.partialTransactions) {
            if (bill.partialTransactions.length > 0) {
              let { partialTransactions } = bill;
              let newPartialTransactions = [];
              // update the newPartialTransactions Array so that we can update the partial transactions array of bill
              updateNewPartialTransactions(partialTransactions,billData[i],newPartialTransactions)
              let update = {
                $set: {
                  partialTransactions: newPartialTransactions,
                },
              };
              let options = { new: true, useFindAndModify: false };

              let updatedBill = await Bill.findByIdAndUpdate(
                billId,
                update,
                options
              ).session(session);
              updatedBillTransactions.push(updatedBill);
            }
            // return res.send({ message: "transaction recorded", updatedBill });
          } else {
            throw new Error("There is no partial transactions in a bill");
          }
        } else {
          throw new Error(`There is no bill of this ${billId} bill id `);
        }
      }
      await session.commitTransaction();
      return res.send({
        message: "transaction updated",
        updatedBillTransactions,
      });
    }
  } catch (err) {
    await session.abortTransaction();
    return res.status(422).send({ message: err.message });
  } finally {
    session.endSession();
  }
};
/**
 * get bill status of members in a session
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
module.exports.getBillStatusOfMembersInASession = async (req, res) => {
  try {
    let { sessionId, date } = req.body;

    let enrolment = await Enrolment.find(
      {
        sessionId,
        enrolledStatus: { $in: ENUM_TRANSFER_ALLOWED },
      },
      {
        memberId: 1,
      }
    );

    let enrolledMemberIds = enrolment.map(({ memberId }) => ObjectId(memberId));

    let { query, options } = getPaginationOptions(req);
    query = {
      ...query,
      memberId: { $in: enrolledMemberIds },
      billDate: new Date(date),
    };

    options.populate = [
      {
        path: "member",
        select: ["name"],
      },
    ];

    let response = await Bill.paginate(query, options);
    return res.send(response);
  } catch (err) {
    return res.send({ message: err.message });
  }
};


const updateNewPartialTransactions=(partialTransactions,billData,newPartialTransactions)=>{
  for (let j = 0; j < partialTransactions.length; j++) {
    let index = billData.transactions.findIndex(
      ({ _id }) => _id === partialTransactions[j]._id.toString()
    );
    if (index > -1) {
      let id = partialTransactions[j]._id;
      let newObj = partialTransactions[j];
      for (let key in billData.transactions[index]) {
        newObj[key] = billData.transactions[index][key];
      }
      partialTransactions[j] = newObj;
      newPartialTransactions.push(partialTransactions[j]);
    } else {
      newPartialTransactions.push(partialTransactions[j]);
    }
  }
}