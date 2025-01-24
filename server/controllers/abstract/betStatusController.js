// server\controllers\abstract\betStatusController.js
const { BetStatus } = require("../../models/models");
const ApiError = require("../../error/ApiError");

class BetStatusController {
  async create(req, res, next) {
    try {
      const { name } = req.body;

      if (!name) {
        return next(ApiError.unauthorized("Ошибка создания статуса ставки: Название не указано!"));
      }

      const data = await BetStatus.create({ name });
      return res.json(data);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async get(req, res, next) {
    try {
      const { id, name } = req.query;

      let data;

      if (!id && !name) {
        data = await BetStatus.findAll();
      } else if (id) {
        data = await BetStatus.findOne({ where: { id } });
      } else if (name) {
        data = await BetStatus.findOne({ where: { name } });
      }
      return res.json(data);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new BetStatusController();
