const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

require("dotenv").config();



//importing from local files
const businessRoute = require("./src/routes/business");
const evaluationRoute = require("./src/routes/evaluation");

//connecting to mongodb database


mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
   
    
})
    .then(() => {
        console.log('DB CONNECTED!!')
    })
    .catch((err) => {
        console.log(`DB NOT CONNECTED!!${err}`)
    });

app.use(bodyParser.json());

//initialaising port no
const port = process.env.SERVER_PORT ;


//  Routes

app.get("/", (req, res) =>console.log("hello  server is working!!!"))


// my routes

app.use("/api", businessRoute);
app.use("/api", evaluationRoute);

//app.use("/api", authRoute);


// server listening to the port

app.listen( port, () => console.log(`server is successfully listenning at port: ${port}`));