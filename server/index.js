// server\index.js
require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const models = require("./models/models"); // Импорт моделей
const cors = require("cors");
const router = require("./routes/index"); // Импорт роутера
const errorHandler = require("./middleware/ErrorHandlingMiddleware"); // Импорт обработчика ошибок

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);

// Обработка ошибок, последний Middleware
app.use(errorHandler);

app.get("/", (req, res) => {
    res.status(200).json({ message: "Working!" });
});

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();
