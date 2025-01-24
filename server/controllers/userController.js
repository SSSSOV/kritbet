// server\controllers\userController.js
const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, UserBalance, UserVerification } = require("../models/models");

const generateJwt = (id, login, role, userVerificationId, full_name, email, phone) => {
  return jwt.sign(
    { id, login, role, userVerificationId, full_name, email, phone },
    process.env.SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );
};

class UserController {
  async registration(req, res, next) {
    const { full_name, login, password, email, birthday, phone } = req.body;
    if (!full_name || !login || !password || !email || !birthday || !phone) {
      return next(ApiError.badRequest("Некорректные данные"));
    }

    let candidate = await User.findOne({ where: { full_name } });
    if (candidate) {
      return next(ApiError.badRequest("Пользователь с таким ФИО уже существует"));
    }
    candidate = await User.findOne({ where: { login } });
    if (candidate) {
      return next(ApiError.badRequest("Пользователь с таким логином уже существует"));
    }

    const hashPassword = await bcrypt.hash(password, 5);

    const role = "USER";
    const { id: userVerificationId } = await UserVerification.findOne({
      where: { name: "Не верифицирован" },
    });

    const user = await User.create({
      role,
      full_name,
      login,
      password: hashPassword,
      email,
      birthday,
      phone,
      userVerificationId,
    });
    const userBalance = await UserBalance.create({ userId: user.id });

    const token = generateJwt(
      user.id,
      user.login,
      user.role,
      user.userVerificationId,
      user.full_name,
      user.email,
      user.phone
    );
    return res.json({ token });
  }
  async login(req, res, next) {
    const { login, password } = req.body;
    const user = await User.findOne({ where: { login } });
    if (!user) {
      return next(ApiError.unauthorized("Пользователь не найден!"));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.unauthorized("Пароль неверный!"));
    }
    const token = generateJwt(
      user.id,
      user.login,
      user.role,
      user.userVerificationId,
      user.full_name,
      user.email,
      user.phone
    );
    return res.json({ token });
  }
  async check(req, res, next) {
    const token = generateJwt(
      req.user.id,
      req.user.login,
      req.user.role,
      req.user.userVerificationId,
      req.user.full_name,
      req.user.email,
      req.user.phone
    );
    return res.json({ token });
  }
}

module.exports = new UserController();
