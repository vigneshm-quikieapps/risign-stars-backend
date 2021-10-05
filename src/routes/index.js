//importing from local files
const businessRoute = require("./business");
const businessFinanceRoute = require("./businessFinance");
const discountRoute = require("./discount");
const evaluationRoute = require("./evaluation");
const roleRoute = require("./role");
const userRoute = require("./user");
const attendanceRoute = require("./attendance");
const notification = require("./notification");
const authRoutes = require("./auth");
const accountRoutes = require("./account");

const memberRoute = require("./Member");
const classRoute = require("./businessClass");
const sessionRoute = require("./businessSession");
const termRoute = require("./Term");
const categoryRoute = require("./category");
const registrationRoute = require("./registration");
const testRoute = require("./testRoute");
const enrolmentRoute = require("./enrolment");
const routes = (app) => {
  // API routes
  app.use("/api/account", accountRoutes);
  app.use("/api/roles", roleRoute);
  app.use("/api/users", userRoute);
  app.use("/api/businesses", businessRoute);
  app.use("/api/businessFinances", businessFinanceRoute);
  app.use("/api/discounts", discountRoute);
  app.use("/api/evaluations", evaluationRoute);
  app.use("/api", roleRoute);
  app.use("/api", userRoute);
  app.use("/api", attendanceRoute);
  app.use("/api", notification);
  app.use("/api", authRoutes);
  app.use("/api", memberRoute);
  app.use("/api/enrolments", enrolmentRoute);
  app.use("/api/classes", classRoute);
  app.use("/api/terms", termRoute);
  app.use("/api/categories", categoryRoute);
  app.use("/api/Sessions", sessionRoute);
  app.use("/api", registrationRoute);
  app.use("/api/test", testRoute);

  // test route
  app.get("/", (req, res) => {
    return res.send({ message: "hello world" });
  });
};

module.exports = routes;
