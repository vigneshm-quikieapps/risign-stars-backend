const mongoose = require("mongoose");
const express = require("express");
const { check, validationResult } = require("express-validator");
// const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const generatePassword = require("../helpers/auth/generatePassword");
const generateHash = require("../helpers/auth/generateHash");
const createAccessToken = require("../helpers/auth/createAccessToken");
const verifyRefreshToken = require("../helpers/auth/verifyRefreshToken");

// Signup Method
module.exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()[0].msg,
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).send({
        Message: "Email has already Registereds",
      });
    }
    res.json({ user });
  });
  const token = jwt.sign({ _id: user._id }, "ACCESS_TOKEN", {
    expiresIn: "20s",
  });
  const refreshToken = jwt.sign({ _id: user._id }, "REFRESH_TOKEN", {
    expiresIn: "1y",
  });
};

// Signed Method
exports.signin = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()[0].msg,
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "USER does not exit",
      });
    }
    if (!user.autheticate(password)) {
      return res.status(401).json({
        error: "Email and Passoword does not Match",
      });
    }
    // creating the token
    const token = jwt.sign({ _id: user._id }, "ACCESS_TOKEN", {
      expiresIn: "20s",
    });
    const refreshToken = jwt.sign({ _id: user._id }, "REFRESH_TOKEN", {
      expiresIn: "15days",
    });

    console.log("====================================");
    console.log("token", token);
    console.log("====================================");

    console.log("====================================");
    console.log("refreshToken", refreshToken);
    console.log("====================================");
    res.send({ token, refreshToken });
    // put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 }); // exipry time
    //  send response to frontend
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

// Protected Routes
exports.isSignedIn = expressJwt({
  // in this middleware the next() is already there or written in expressJwt so we no need to specify explicitely
  secret: "TEMPU",
  algorithms: ["RSA", "sha1", "RS256", "HS256"],
  userProperty: "auth", // this middleware put this auth onto the request
});

// custom middlewares
exports.isAuthenticated = (req, res, next) => {
  //  isAuthenticated means user can change things in his own account
  const checker = req.profile && req.auth && req.profile._id == req.auth._id; // through a frontend we will set a property called profile, and this property is only going to set if user is login
  if (!checker) {
    res.status(403).json({
      error: "ACCESS DENIED",
    });
  }

  next();
};

// Refresh Token
module.exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.send({ Message: "Refresh Token is Not resent" });
    }
    const userId = await verifyRefreshToken(refreshToken);
    const token = jwt.sign({ userId }, "TEMPU", { expiresIn: "50s" });
    const newRefreshToken = jwt.sign({ userId }, "REFRESHTOKEN", {
      expiresIn: "1y",
    });
    res.send({ userId, token, newRefreshToken });
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    res.send({ error });
  }
};

// if (!errors.isEmpty()) {
//   return res.status(422).json({
//     errors: errors.array()[0].msg,
//   });
// }
// try {
//   // let password = generatePassword();

//   let data = req.body;
//   // data.password = generateHash(password);

//   let user = await User.create(data);

//   // return res.status(201).send(token);
//   return res.status(201).send({ message: "added successfully", user });
// } catch (err) {
//   return res.status(422).send({ message: "Email is already Register" });

// }
