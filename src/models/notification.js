const mongoose = require("mongoose");

const Device = new mongoose.Schema({
  deviceId: { type: String },
  platform: { type: String },
});

module.exports = mongoose.model("Device", Device);
