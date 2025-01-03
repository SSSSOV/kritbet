const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const { User, UserBalance } = require("../models/models");

class UserController {
    async registration(req, res, next) {
        const { role, full_name, login, password, email, birthday, phone } = req.body;
        if (!full_name || !login || !password || !email || !birthday || !phone) {
            return next(ApiError.badRequest("Некорректные данные"));
        }

        const candidate = await User.findOne({ where: { full_name } });
        if (candidate) {
            return next(ApiError.badRequest("Пользователь с таким ФИО уже существует"));
        }
        candidate = await User.findOne({ where: { login } });
        if (candidate) {
            return next(ApiError.badRequest("Пользователь с таким логином уже существует"));
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const userBalance = await UserBalance;

        const user = await User.create({
            role,
            full_name,
            login,
            password: hashPassword,
            email,
            birthday,
            phone,
        });
    }
    async login(req, res) {}
    async check(req, res, next) {
        const { id } = req.query;
        if (!id) {
            return next(ApiError.badRequest("Не задан ID"));
        }
        res.json(id);
    }
}

module.exports = new UserController();
