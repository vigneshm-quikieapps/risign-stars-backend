//importing from local files
const businessRoute = require("./business");
const evaluationRoute = require("./evaluation");
const roleRoute = require("./role");
const userRoute = require("./user");
const attendanceRoute = require("./attendance");
const notification = require("./notification");
const authRoutes = require("./auth");
const accountRoutes = require("./account");

const routes = (app) => {
  // API routes
  app.use("/api/account", accountRoutes);
  app.use("/api", businessRoute);
  app.use("/api", evaluationRoute);
  app.use("/api", roleRoute);
  app.use("/api", userRoute);
  app.use("/api", attendanceRoute);
  app.use("/api", notification);
  app.use("/api", authRoutes);
 
  // test route
  app.get("/", (req, res) => {
    return res.send({ message: "hello world" });
  });
};

module.exports = routes;
