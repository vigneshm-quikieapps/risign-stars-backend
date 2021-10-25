const express = require("express");
const router = express.Router();

const {
  sendNotification,
  saveNotificationData,
} = require("../controllers/send");

// Sending the Notification to the User
router.get("/", sendNotification);
router.post("/", saveNotificationData);

module.exports = router;
