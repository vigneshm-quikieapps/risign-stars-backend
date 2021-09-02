const mongoose = require("mongoose");
const express = require("express");
const app = express();


require("dotenv").config();



//importing from local files
const businessRoute = require("./src/routes/business");
const evaluationRoute = require("./src/routes/evaluation");
const roleRoute = require("./src/routes/role")
const userRoute = require("./src/routes/user")

//connecting to mongodb database
let mongoDBUrl = process.env.MONGODB_URL || "mongodb://localhost:27017/raisingstars"
mongoose.connect(mongoDBUrl, {
    useNewUrlParser: true,
}).then(() => {
    console.log('DB CONNECTED!!')
})
.catch((err) => {
    console.log(`DB NOT CONNECTED!!${err}`)
});

//initialising port no
const port = process.env.PORT || 3000;

app.use(express.json())

// test route
app.get("/", (req, res) => {
    return res.send({message: "hello world"})
})

// API routes
app.use("/api", businessRoute);
app.use("/api", evaluationRoute);
app.use("/api", roleRoute);
app.use("/api", userRoute);
//app.use("/api", authRoute);


// server listening to the port

app.listen( port, () => console.log(`server is successfully listenning at port: ${port}`));