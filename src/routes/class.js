const express = require("express")
const router = express.Router();

const _class = require("../controllers/class")

router.get("/class", _class.getAll);
router.get("/class/:id", _class.get);
router.post("/class", _class.create);


module.exports = router;