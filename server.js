const mongoose = require("mongoose");
const { app } = require("./src/app");

//connecting to mongodb database
mongoose
  .connect(
    process.env.MONGODB_URL || "mongodb://localhost:27017/risingStarDev",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("DB CONNECTED!!");
  })
  .catch((err) => {
    console.log("DB NOT CONNECTED!!", err);
  });

//initialising host and port no
const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 3000;

// server listening to the port
app.listen(port, host, () =>
  console.log(
    `server is successfully listenning at host: ${host}, port: ${port}`
  )
);
