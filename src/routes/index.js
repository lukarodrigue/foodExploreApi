const { Router } = require("express");

const userRouter = require("./users.routes");
const dishesRoutes = require("./dishes.routes");
const sessionsRouter = require("./sessions.routes");
const ordersRouter = require("./orders.routes");
const favoritesRouter = require("./favorites.routes");
const cartsRouter = require("./carts.routes");

const routes = Router();

routes.use("/users", userRouter);
routes.use("/dishes", dishesRoutes);
routes.use("/sessions", sessionsRouter);
routes.use("/orders", ordersRouter);
routes.use("/favorites", favoritesRouter);
routes.use("/carts", cartsRouter);

module.exports = routes;
