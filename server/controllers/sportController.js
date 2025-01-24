// server\controllers\sportController.js
const { MatchSport } = require("../models/models");
const ApiError = require("../error/ApiError");

class SportController {
  async create(req, res, next) {
    try {
      const { name } = req.body;

      if (!name) {
        return next(ApiError.badRequest("Ошибка создания спорта: Название не указано!"));
      }

      const sport = await MatchSport.create({ name });
      return res.json(sport);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async get(req, res, next) {
    try {
      const { id, name } = req.query;

      let data;

      if (!id && !name) {
        data = await MatchSport.findAll();
      } else if (id) {
        data = await MatchSport.findOne({ where: { id } });
      } else if (name) {
        data = await MatchSport.findOne({ where: { name } });
      }
      return res.json(data);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new SportController();
