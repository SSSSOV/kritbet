// server\controllers\cityController.js
const { UserBalance } = require("../models/models");
const ApiError = require("../error/ApiError");

class BalanceController {
  async get(req, res, next) {
    try {
      const { id, userId } = req.query;
      let balance;

      if (!id && !userId) {
        return next(
          ApiError.unauthorized("Ошибка получения баланса: ID баланса или пользователя не указан!")
        );
      }

      if (id) {
        balance = await UserBalance.findOne({ where: { id: id } });
      } else if (userId) {
        balance = await UserBalance.findOne({ where: { userId: userId } });
      }

      return res.json(balance);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new BalanceController();
