const express = require("express");
const router = express.Router();

const {
  sendNotification,
  saveNotificationData,
} = require("../controllers/send");

// Sending the Notification to the User
router.get("/notification", sendNotification);
router.post("/notification", saveNotificationData);

module.exports = router;
