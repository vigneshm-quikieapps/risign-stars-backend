const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

//importing from local files
const businessRoute = require("./src/routes/business");
const evaluationRoute = require("./src/routes/evaluation");
const roleRoute = require("./src/routes/role");
const userRoute = require("./src/routes/user");
const coachRoute= require("./src/routes/coach")

//connecting to mongodb database

mongoose.connect("mongodb://localhost:27017/raisingstars", {
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
app.use("/api", coachRoute);

// server listening to the port
app.listen(port, () =>
  console.log(`server is successfully listenning at port: ${port}`)
);
