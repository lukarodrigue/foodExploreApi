const { Router } = require("express");

const OrdersController = require("../controller/OrdersController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const ordersRoutes = Router();

const ordersController = new OrdersController();

ordersRoutes.use(ensureAuthenticated);

ordersRoutes.post("/", ordersController.create);

module.exports = ordersRoutes;