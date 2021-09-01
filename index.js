const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("dotenv").config();




// import middlewares
// import middlewares
// import middlewares


//importing from local files
const businessRoute = require("./src/routes/business");
//const evaluationRoute = require("./src/Routes/evaluation")


//connecting to mongodb database


mongoose.connect("mongodb://localhost:27017/raisingstars", {
    useNewUrlParser: true,
   
    
})
    .then(() => {
        console.log('DB CONNECTED!!')
    })
    .catch((err) => {
        console.log(`DB NOT CONNECTED!!${err}`)
    });







//initialaising port no
const port = process.env.SERVER_PORT || 8000;





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