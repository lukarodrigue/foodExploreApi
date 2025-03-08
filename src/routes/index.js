const { Router } = require("express");

const userRouter = require("./dishes.routes");
const dishesRoutes = require("./dishes.routes");
const sessionsRouter = require("./sessions.routes");
const ordersRouter = require("./orders.routes");

const routes = Router();
routes.use("/users", userRouter);
routes.use("/dishes", dishesRoutes);
routes.use("/sessions", sessionsRouter);
routes.use("/orders", ordersRouter);


module.exports = routes;
