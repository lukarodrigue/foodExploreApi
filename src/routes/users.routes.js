const { Router } = require("express");

const UsersController = require("../controller/UsersController");

const userRoutes = Router();

const usersController = new UsersController();

userRoutes.post("/", usersController.create);
userRoutes.put("/:id", usersController.update);

module.exports = userRoutes;
