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
const notification = require("./src/routes/notification");
const progressRoute = require("./src/routes/progress");
const studentRoute = require("./src/routes/student")
const coachRoute= require("./src/routes/coach")
const SessionRoute= require("./src/routes/businessSession")
const classRoute= require("./src/routes/businessClass")
const categoryRoute= require("./src/routes/category")
const termRoute= require("./src/routes/Term")

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
const port =  8000;

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
app.use("/api", notification);
app.use("/api", progressRoute);
app.use("/api", studentRoute);
app.use("/api", coachRoute);
app.use("/api", SessionRoute);
app.use("/api", classRoute);
app.use("/api", categoryRoute);
app.use("/api", termRoute);

// server listening to the port
app.listen(port, () =>
  console.log(`server is successfully listenning at port: ${port}`)
);
