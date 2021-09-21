const mongoose = require("mongoose");
const { app } = require("./src/app");

//connecting to mongodb database
mongoose
  .connect(
    process.env.MONGODB_URL || "mongodb://localhost:27017/raisingstars",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("DB CONNECTED!!");
  })
  .catch(() => {
    console.log("DB NOT CONNECTED!!");
  });

//initialising port no
const port = process.env.PORT || 3000;

// server listening to the port
app.listen(port, () =>
  console.log(`server is successfully listenning at port: ${port}`)
);
