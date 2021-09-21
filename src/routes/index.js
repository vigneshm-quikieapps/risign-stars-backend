//importing from local files
const businessRoute = require("./business");
const evaluationRoute = require("./evaluation");
const roleRoute = require("./role");
const userRoute = require("./user");
const attendanceRoute = require("./attendance");
const notification = require("./notification");
const authRoutes = require("./auth");
const accountRoutes = require("./account");

const memberRoute = require("./Member");
const enrolementRoute = require("./businessClass");
const classRoute = require("./class");
const sessionRoute = require("./businessSession");
const termRoute = require("./Term");
const categoryRoute = require("./category");
const coachRoute = require("./coach");
const registrationRoute = require("./registration");
const testRoute = require("./testRoute");

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
  app.use("/api", memberRoute);
  app.use("/api", enrolementRoute);
  app.use("/api", classRoute);
  app.use("/api", termRoute);
  app.use("/api", categoryRoute);
  app.use("/api", coachRoute);
  app.use("/api", sessionRoute);
  app.use("/api", registrationRoute);
  app.use("/api/test", testRoute);

  // test route
  app.get("/", (req, res) => {
    return res.send({ message: "hello world" });
  });
};

module.exports = routes;
