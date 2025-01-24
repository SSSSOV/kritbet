// server\controllers\participantTypeController.js
const { ParticipantType } = require("../../models/models");
const ApiError = require("../../error/ApiError");

class ParticipantTypeController {
  async create(req, res, next) {
    try {
      const { name } = req.body;

      if (!name) {
        return next(ApiError.unauthorized("Ошибка создания типа участника: Название не указано!"));
      }

      const data = await ParticipantType.create({ name });
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
        data = await ParticipantType.findAll();
      } else if (id) {
        data = await ParticipantType.findOne({ where: { id } });
      } else if (name) {
        data = await ParticipantType.findOne({ where: { name } });
      }
      return res.json(data);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new ParticipantTypeController();
