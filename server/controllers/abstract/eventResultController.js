// server\controllers\abstract\eventResultController.js
const { EventResult } = require("../../models/models");
const ApiError = require("../../error/ApiError");

class EventResultController {
  async create(req, res, next) {
    try {
      const { name } = req.body;

      if (!name) {
        return next(
          ApiError.unauthorized("Ошибка создания результата матча: Название не указано!")
        );
      }

      const data = await EventResult.create({ name });
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
        data = await EventResult.findAll();
      } else if (id) {
        data = await EventResult.findOne({ where: { id } });
      } else if (name) {
        data = await EventResult.findOne({ where: { name } });
      }
      return res.json(data);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new EventResultController();
