const { Router } = require("express");

const DishesController = require("../controller/DishesController");

const dishesRoutes = Router();

const dishesController = new DishesController();

dishesRoutes.get("/", dishesController.index);
dishesRoutes.post("/:user_id", dishesController.create);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.delete("/:id", dishesController.delete);
dishesRoutes.patch("/:id", dishesController.update);

module.exports = dishesRoutes;