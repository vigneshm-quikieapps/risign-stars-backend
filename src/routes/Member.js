const express = require("express")
const router = express.Router();
const {
    createMemberValidationRules, 
  } = require("../validations/member");

const member = require("../controllers/Member");
const  validate  = require("../validations/validate");





router.get("/member", member.getAllMember);
router.post("/member", member.create);
router.put("/member/:id",createMemberValidationRules(),validate, member.update);
router.get("/member/:id", member.getEmergencyContact);
router.delete("/member/:id", member.delete);
router.put("/member/:memberId/:businessId",member.addMembership);


module.exports = router;