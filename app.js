const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const path = require("path");

// const bodyParser = require("body-parser");
// app.use(bodyParser.json());
//importing from local files
const businessRoute = require("./src/routes/business");
const evaluationRoute = require("./src/routes/evaluation");
const roleRoute = require("./src/routes/role");
const userRoute = require("./src/routes/user");
const attendanceRoute = require("./src/routes/attendance")
const memberRoute = require("./src/routes/Member");
const enrolementRoute = require("./src/routes/businessClass");
const classRoute = require("./src/routes/class");
const sessionRoute = require("./src/routes/businessSession")
const termRoute = require("./src/routes/Term")
const categoryRoute = require("./src/routes/category")
const coachRoute = require("./src/routes/coach")
//connecting to mongodb database
let mongoDBUrl =
  process.env.MONGODB_URL || "mongodb://localhost:27017/raisingstars";
const notification = require("./src/routes/notification");
const authRoutes = require("./src/routes/auth");
const registrationRoute = require("./src/routes/registration");

//connecting to mongodb database

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost:27017/raisingstars", {
    useNewUrlParser: true

})
    .then(() => {
        console.log('DB CONNECTED!!')
    })
    .catch(() => {
        console.log("DB NOT CONNECTED!!")
    });

//initialising port no
// const port =  8000;
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

// test route
app.get("/", (req, res) => {
  return res.send({ message: "hello world" });
});

// API routes
app.use("/api", businessRoute);
app.use("/api", evaluationRoute);
app.use("/api", roleRoute);
app.use("/api", userRoute);
app.use("/api", attendanceRoute);
app.use("/api", memberRoute);
app.use("/api", enrolementRoute);
app.use("/api", classRoute);
app.use("/api", termRoute);
app.use("/api", categoryRoute);
app.use("/api", coachRoute);

app.use("/api", notification);
app.use("/api", authRoutes);

app.use("/api", sessionRoute);
app.use("/api", registrationRoute);

// server listening to the port
app.listen(port, () =>
  console.log(`server is successfully listenning at port: ${port}`)
);