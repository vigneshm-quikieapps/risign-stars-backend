const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("dotenv").config();




// import middlewares


//importing from local files
const businessRoute = require("./src/Routes/business");
//const evaluationRoute = require("./src/Routes/evaluation")


//connecting to mongodb database


mongoose.connect("process.env.MONGODB_URL", {
    useNewUrlParser: true,
    userUnifiedTopology: true,
    userCreateIndex: true
})
    .then(() => {
        console.log('DB CONNECTED!!')
    })
    .catch(() => {
        console.log("DB NOT CONNECTED!!")
    });







//initialaising port no
const port = process.env.PORT || 8000;





//  Routes

app.get("/", (req, res) =>
    console.log("hello  server is working!!!")

)

// my routes
app.use("/api", businessRoute);
//app.use("/api", evaluationRoute);

//app.use("/api", authRoute);






// server listening to the port

app.listen( port, () => console.log(`server is successfully listenning at port: ${port}`));