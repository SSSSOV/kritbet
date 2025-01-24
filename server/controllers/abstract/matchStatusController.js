// server\controllers\abstract\matchStatusController.js
const { MatchStatus } = require("../../models/models");
const ApiError = require("../../error/ApiError");

class MatchStatusController {
  async create(req, res, next) {
    try {
      const { name } = req.body;

      if (!name) {
        return next(ApiError.unauthorized("Ошибка создания статуса матча: Название не указано!"));
      }

      const data = await MatchStatus.create({ name });
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
        data = await MatchStatus.findAll();
      } else if (id) {
        data = await MatchStatus.findOne({ where: { id } });
      } else if (name) {
        data = await MatchStatus.findOne({ where: { name } });
      }
      return res.json(data);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new MatchStatusController();
