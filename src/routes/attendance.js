const express = require("express");
const router = express.Router();

const {
    createActiivty,
    addAttendance,
    GetAllActivity,
    updateAttendance
} = require("../controllers/attendance");

router.get("/activity", GetAllActivity)
router.post("/activity/create", createActiivty)
router.put("/attendance/:id", addAttendance)
router.put("/date/:id", updateAttendance)


module.exports = router;