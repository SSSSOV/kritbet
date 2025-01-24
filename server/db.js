// server\db.js
const { Sequelize } = require("sequelize");

module.exports = new Sequelize(
    process.env.DB_NAME, // Name of Data Base
    process.env.DB_USER, // User for connection
    process.env.DB_PASSWORD, // Password for connection
    {
        dialect: "postgres",
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
    }
);
