// server\controllers\abstract\betTypeController.js
const { BetType } = require("../../models/models");
const ApiError = require("../../error/ApiError");

class BetTypeController {
  async create(req, res, next) {
    try {
      const { name } = req.body;

      if (!name) {
        return next(ApiError.unauthorized("Ошибка создания типа ставки: Название не указано!"));
      }

      const data = await BetType.create({ name });
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
        data = await BetType.findAll();
      } else if (id) {
        data = await BetType.findOne({ where: { id } });
      } else if (name) {
        data = await BetType.findOne({ where: { name } });
      }
      return res.json(data);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new BetTypeController();
