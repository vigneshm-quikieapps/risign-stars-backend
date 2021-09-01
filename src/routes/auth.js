const express = require("express");
const router = express.Router();

// routes




router.post(
  "/signup",
  [
    check("name", "name should be at least 3 char").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 3 char").isLength({ min: 3 })
  ],
  signup
);

router.post("/signin",
[
  check("email","email is required").isEmail(),
  check("password","password should be at least 3 sharacters long").isLength({min:3})
],signin);



router.get("/signout", signout);



module.exports=router;