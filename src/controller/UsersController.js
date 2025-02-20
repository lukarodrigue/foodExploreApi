const { hash } = require("bcryptjs");
const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite");

class UsersController {
    async create(request, response) {
        const { name, email, password, is_admin = false } = request.body;
        const database = await sqliteConnection();
        const checkUserExist = await database.get("SELECT * FROM users WHERE email = (?)", [email])

        if (checkUserExist) {
            throw new AppError("Este email já está em uso.")
        }
        const hashedPassword = await hash(8, password);

        await database.run(
            "INSERT INTO users (name. email, password, is_admin) VALUES (?,?,?,?)",
            [name, email, password, is_admin]
        );

    }
}

module.exports = UsersController;
