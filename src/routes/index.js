const { Router } = require("express");

const userRouter = require("./users.routes");
const dishesRoutes = require("./dishes.routes");


const routes = Router();
routes.use("/users", userRouter);
routes.use("/dishes", dishesRoutes);



module.exports = routes;
