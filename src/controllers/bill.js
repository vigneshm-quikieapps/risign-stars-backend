const { Bill, Enrolment, BusinessSession, Member } = require("../models");
const {
  getQuery,
  getOptions,
  getPaginationOptions,
} = require("../helpers/query");
const { PAYMENT_METHOD_MANUAL } = require("../constants/bill");
const { ENUM_TRANSFER_ALLOWED } = require("../constants/enrolment");
const mongoose = require("mongoose");
const { ObjectId } = require("mongoose").Types;
const moment = require("moment");

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

// Earlier this function is used
// module.exports.billsOfAMemberInAClass = async (req, res) => {
//   try {
//     let query = getQuery(req);
//     let { memberId, classId } = req.body;
//     query = { ...query, memberId, classId };
//     let options = getOptions(req);

//     let response = await Bill.paginate(query, options);
//     return res.send(response);
//   } catch (err) {
//     return res.send({ message: err.message });
//   }
// };

// Now api is using this function by taking enrolmentId instead of classId in body payload
module.exports.billsOfAMemberInAClass = async (req, res) => {
  try {
    let query = getQuery(req);
    let { memberId, enrolmentId } = req.body;
    query = { ...query, memberId, enrolmentId };
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

// helper function to enter a first new partial transaction of bill
const enterFirstNewTransaction = async (
  billId,
  reference,
  type,
  amount,
  paymentDate,
  paymentMethod,
  billData,
  session
) => {
  let transactionArray = [];
  let now = new Date();
  let date = new Date(paymentDate);
  let partialObj = {
    amount: amount,
    reference: reference,
    method: paymentMethod,
    transactionType: type,
    paidAt: date,
    updateMethod: PAYMENT_METHOD_MANUAL,
    processDate: now,
  };
  transactionArray.push(partialObj);
  let update = {
    $set: {
      billStatus: "SUSPENDED",
      partialTransactions: transactionArray,
    },
  };
  if (billData.subtotal == amount) {
    update = {
      $set: {
        billStatus: "SUSPENDED",
        partialTransactions: transactionArray,
        paidAt: date,
      },
    };
  }
  let options = { new: true, useFindAndModify: false };

  let bill = await Bill.findByIdAndUpdate(billId, update, options).session(
    session
  );
  return bill;
};

// helper function tp enter a new partial transaction of bill
const enterNewTransaction = async (
  billId,
  reference,
  type,
  amount,
  paymentDate,
  paymentMethod,
  diff,
  billData,
  session
) => {
  let now = new Date();
  let date = new Date(paymentDate);
  // let billStatus = "SUSPENDED";
  let transactionArray = [];
  let partialObj = {
    amount: amount,
    reference: reference,
    method: paymentMethod,
    transactionType: type,
    paidAt: date,
    updateMethod: PAYMENT_METHOD_MANUAL,
    processDate: now,
  };
  transactionArray = billData.partialTransactions;
  transactionArray.push(partialObj);
  let update = {
    billStatus: "SUSPENDED",
    partialTransactions: transactionArray,
  };
  if (diff == amount) {
    update = {
      billStatus: "SUSPENDED",
      partialTransactions: transactionArray,
      paidAt: date,
    };
  }

  // console.log("billStatus", billStatus);
  let options = { new: true, useFindAndModify: false };

  let bill = await Bill.findByIdAndUpdate(billId, update, options).session(
    session
  );
  return bill;
};
// create the single partial transaction of a bill
module.exports.enterTransaction = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    let { billId, reference, type, amount, paymentDate, paymentMethod } =
      req.body;
    let now = new Date();

    let billData = await Bill.findById(billId);

    if (billData.partialTransactions.length == 0) {
      // record a first new transaction

      if (amount <= billData.subtotal) {
        let bill = await enterFirstNewTransaction(
          billId,
          reference,
          type,
          amount,
          paymentDate,
          paymentMethod,
          billData,
          session
        );
        await session.commitTransaction();
        return res.send({ message: "Transaction recorded.", bill });
      } else {
        throw new Error("Transaction amount is greater than sub total.");
      }
    } else {
      // record a new transaction
      let totalSum = 0;
      for (let i = 0; i < billData.partialTransactions.length; i++) {
        totalSum += billData.partialTransactions[i].amount;
      }
      let diff = billData.subtotal - totalSum;
      if (totalSum < billData.subtotal && amount <= diff) {
        let bill = await enterNewTransaction(
          billId,
          reference,
          type,
          amount,
          paymentDate,
          paymentMethod,
          diff,
          billData,
          session
        );
        await session.commitTransaction();
        return res.send({ message: "Transaction recorded.", bill });
      } else {
        throw new Error("No due left cannot record this transaction.");
      }
    }
  } catch (err) {
    await session.abortTransaction();
    return res.status(422).send({ message: err.message });
  } finally {
    session.endSession();
  }
};
// delete the single partial transaction of a bill
module.exports.deleteTransactions = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    let { billId, transactionId } = req.body;
    let billData = await Bill.findById(billId);
    if (billData) {
      if (billData.partialTransactions) {
        // delete the partial transaction of bill with the help of transactionId and billid from body object
        let { partialTransactions } = billData;
        let billStatus = "NOT_PAID";
        let newTransactions = partialTransactions.filter((transaction) => {
          return transaction._id != transactionId;
        });
        if (newTransactions.length == partialTransactions.length) {
          throw new Error("Invalid Transaction Id.");
        }
        let update = {
          $set: {
            partialTransactions: newTransactions,
            billStatus: billStatus,
          },
          $unset: {
            paidAt: "",
          },
        };
        let options = { new: true, useFindAndModify: false };

        let bill = await Bill.findByIdAndUpdate(
          billId,
          update,
          options
        ).session(session);
        await session.commitTransaction();
        return res.send({ message: "Transaction deleted.", bill });
      } else {
        throw new Error("There is no transactions.");
      }
    }
  } catch (err) {
    await session.abortTransaction();
    return res.status(422).send({ message: err.message });
  } finally {
    session.endSession();
  }
};
// update the manual partial transaction of a bill in a batch
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
              // update the newPartialTransactions Array so that we can update the partial transactions array of bill
              let updatedBill = await updateNewPartialTransactions(
                partialTransactions,
                billData[i],
                billId,
                bill,
                session
              );
              updatedBillTransactions.push(updatedBill);
            }
          } else {
            throw new Error("There is no partial transactions in a bill.");
          }
        } else {
          throw new Error(`There is no bill of this ${billId} bill id .`);
        }
      }
      await session.commitTransaction();
      return res.send({
        message: "Transaction updated.",
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

    let fromBillDate = new Date(date);
    let toBillDate = moment(fromBillDate).clone().endOf("Month").toDate();
    toBillDate = moment(toBillDate).format("YYYY-MM-DD");
    console.log(fromBillDate, new Date(toBillDate));
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
      sessionId: sessionId,
      // billDate: new Date(date),
      billDate: {
        $gte: fromBillDate,
        $lte: new Date(toBillDate),
      },
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

// helper function to update the partial transactions of bill used in update transactions
const updateNewPartialTransactions = async (
  partialTransactions,
  billData,
  billId,
  bill,
  session
) => {
  let newPartialTransactions = [];
  let paidDate = "";
  let paidBoolean = false;
  for (let j = 0; j < partialTransactions.length; j++) {
    let index = billData.transactions.findIndex(
      ({ _id }) => _id === partialTransactions[j]._id.toString()
    );

    if (index > -1) {
      let id = partialTransactions[j]._id;
      let newObj = partialTransactions[j];
      for (let key in billData.transactions[index]) {
        newObj[key] = billData.transactions[index][key];
        if (key == "amount") {
          if (billData.transactions[index]["paidAt"]) {
            paidDate = billData.transactions[index]["paidAt"];
            paidBoolean = true;
          } else {
            paidDate = newObj["paidAt"];
            paidBoolean = true;
          }
        }
      }
      partialTransactions[j] = newObj;
      newPartialTransactions.push(partialTransactions[j]);
    } else {
      newPartialTransactions.push(partialTransactions[j]);
    }
  }
  let options = { new: true, useFindAndModify: false };
  let total = newPartialTransactions.reduce(
    (previousValue, currentValue) => previousValue.amount + currentValue.amount
  );
  let update = {
    $set: {
      partialTransactions: newPartialTransactions,
    },
  };
  if (total == bill.subtotal && paidBoolean) {
    update = {
      $set: {
        partialTransactions: newPartialTransactions,
        paidAt: paidDate,
      },
    };
  } else if (total != bill.subtotal) {
    update = {
      $set: {
        partialTransactions: newPartialTransactions,
      },
      $unset: {
        paidAt: "",
      },
    };
  }
  let updatedBill = await Bill.findByIdAndUpdate(
    billId,
    update,
    options
  ).session(session);
  return updatedBill;
};

module.exports.businessAdminDashboardinfo = async (req, res) => {
  try {
    let { businessId, startDate, endDate } = req.body;
    // convert the start date and enddate to date object
    let startDateObj = new Date(startDate);
    let endDateObj = new Date(endDate);
    // months of startdate and endate
    let monthSd = startDateObj.getMonth();
    let monthEd = endDateObj.getMonth();

    let monthObj = {
      0: "JAN",
      1: "FEB",
      2: "MAR",
      3: "APR",
      4: "May",
      5: "JUN",
      6: "JULY",
      7: "AUG",
      8: "SEP",
      9: "OCT",
      10: "NOV",
      11: "DEC",
    };
    // difference between the months of start date and end date
    let diffMonth = monthEd - monthSd;
    // bill information response array
    let respArr = await billInfo(
      diffMonth,
      monthObj,
      startDateObj,
      endDateObj,
      businessId
    );

    return res.send({ message: "Successful.", respArr });
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};

const billInfo = async (
  diffMonth,
  monthObj,
  startDateObj,
  endDateObj,
  businessId
) => {
  let respArr = [];
  for (let i = 0; i < diffMonth + 1; i++) {
    // first day of month
    let firstDay = new Date(
      startDateObj.getFullYear(),
      startDateObj.getMonth() + i,
      1,
      05,
      30,
      00
    );
    // last day of month
    let lastDay = new Date(
      startDateObj.getFullYear(),
      startDateObj.getMonth() + i + 1,
      1,
      05,
      29,
      59
    );
    // bill paid
    let billPaid = await Bill.find({
      businessId: businessId,
      paidAt: { $gte: firstDay, $lte: lastDay },
      paid: true,
    });
    // unpaid bills
    let billNotPaid = await Bill.find({
      businessId: businessId,
      dueDate: { $gte: firstDay, $lte: lastDay },
      paid: false,
    });

    // total no of paid and unpaid bills in a month
    let totalPaidBills = billPaid.length;
    let totalUnPaidBills = billNotPaid.length;

    let totalPaidAmount = 0;
    let totalUnPaidAmount = 0;

    // total paid amount in a month
    totalPaidAmount = billPaid.reduce(
      (prevValue, { subtotal }) => prevValue + subtotal,
      0
    );
    // total unpaid amount in a month
    totalUnPaidAmount = billNotPaid.reduce(
      (prevValue, { subtotal }) => prevValue + subtotal,
      0
    );

    let month = firstDay.getMonth();
    let respObj = {
      month: monthObj[month],
      totalPaidBills: totalPaidBills,
      totalUnPaidBills: totalUnPaidBills,
      totalPaidAmount: totalPaidAmount,
      totalUnPaidAmount: totalUnPaidAmount,
    };

    respArr.push(respObj);
  }
  return respArr;
};

module.exports.memberActiveInActive = async (req, res) => {
  try {
    let { businessId } = req.body;

    // find the enrollments as status enrolled
    let enrolments = await Enrolment.find({
      businessId: businessId,
      enrolledStatus: "ENROLLED",
      startDate: {
        $lte: new Date(),
      },
    }).populate("session");

    // filter out the duplicate memberId
    let activeObj = {};
    for (let i = 0; i < enrolments.length; i++) {
      if (enrolments[i].session.endDate > new Date()) {
        if (enrolments[i].memberId in activeObj) {
          activeObj[enrolments[i].memberId] += 1;
        } else {
          activeObj[enrolments[i].memberId] = 1;
        }
      }
    }

    // count the memberId
    let keyCount = 0;
    for (let key in activeObj) {
      keyCount += 1;
    }

    let total = await Member.count({
      "membership.businessId": businessId,
    });
    let inActive = total - keyCount;

    return res
      .status(200)
      .send({ activeMembers: keyCount, inActiveMembers: inActive });
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};

module.exports.activeDropEnrolments = async (req, res) => {
  try {
    let { businessId, startDate, endDate } = req.body;
    // convert the start date and enddate to date object
    let startDateObj = new Date(startDate);
    let endDateObj = new Date(endDate);
    // months of startdate and endate
    let monthSd = startDateObj.getMonth();
    let monthEd = endDateObj.getMonth();

    let monthObj = {
      0: "JAN",
      1: "FEB",
      2: "MAR",
      3: "APR",
      4: "May",
      5: "JUN",
      6: "JULY",
      7: "AUG",
      8: "SEP",
      9: "OCT",
      10: "NOV",
      11: "DEC",
    };
    // difference between the months of start date and end date
    let diffMonth = monthEd - monthSd;
    let respArr = [];
    for (let i = 0; i < diffMonth + 1; i++) {
      // first day of month
      let firstDay = new Date(
        startDateObj.getFullYear(),
        startDateObj.getMonth() + i,
        1,
        05,
        30,
        00
      );
      // last day of month
      let lastDay = new Date(
        startDateObj.getFullYear(),
        startDateObj.getMonth() + i + 1,
        1,
        05,
        29,
        59
      );
      let newActiveEnrolments = await Enrolment.count({
        businessId,
        registeredDate: { $gte: firstDay, $lte: lastDay },
        enrolledStatus: "ENROLLED",
      });

      let newDropEnrolments = await Enrolment.count({
        businessId,
        droppedDate: { $gte: firstDay, $lte: lastDay },
        enrolledStatus: "DROPPED",
      });
      let month = firstDay.getMonth();
      let respObj = {
        month: monthObj[month],
        newActiveEnrolments: newActiveEnrolments,
        newDropEnrolments: newDropEnrolments,
      };

      respArr.push(respObj);
    }
    return res.status(200).send({ message: "Successful.", respArr });
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};

module.exports.markStandingOrder = async (req, res) => {
  try {
    let { billId } = req.body;
    const response = await Bill.findByIdAndUpdate(billId, {
      $set: {
        billStatus: "STANDING_ORDER",
      },
    });
    return res.send({
      message: "Transaction updated.",
    });
  } catch (err) {
    return res.send({ message: err.message });
  }
};
