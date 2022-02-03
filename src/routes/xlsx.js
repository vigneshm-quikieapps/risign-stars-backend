const express = require("express");
const router = express.Router();
const { isAuthorized } = require("../middlewares/auth");
const { getXlsxById, getAllXlsx } = require("../controllers/xlsx");
const { BUSINESS_DEFINITION } = require("../constants/pages");
const { CREATE, UPDATE, READ, DELETE } = require("../constants/rest");

// route for get xlsx by id
router.get("/:xlsxId", isAuthorized(BUSINESS_DEFINITION, READ), getXlsxById);

// route for get all xlsx
router.get("/", isAuthorized(BUSINESS_DEFINITION, READ), getAllXlsx);

module.exports = router;
