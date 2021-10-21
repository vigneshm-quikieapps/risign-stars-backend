const express = require("express");
const router = express.Router();

const { getByClubMembershipId } = require("../controllers/memberConsent");

router.get("/by-club-membership-id/:clubMembershipId", getByClubMembershipId);

module.exports = router;
