require("express-async-errors");
require("dotenv/config");

const cors = require("cors");
const express = require("express");
const database = require("./database/sqlite");
const AppError = require("./utils/AppError")
const routes = require("./routes");
const app = express();
const uploadConfig = require("./config/upload");
const migrationsRun = require("./database/sqlite/migrations");

app.use(cors());
app.use(express.json());

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

app.use(routes);

database();

migrationsRun();

app.use((error, request, response, next) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message,
        });
    }
    console.log(error)

    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    })

})

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
