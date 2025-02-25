const { Router } = require("express");

const UsersController = require("../controller/UsersController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")


const userRoutes = Router();

const usersController = new UsersController();

userRoutes.post("/", usersController.create);
userRoutes.put("/", ensureAuthenticated, usersController.update);

module.exports = userRoutes;
