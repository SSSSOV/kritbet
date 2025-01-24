// server\controllers\participantController.js
const { Participant } = require("../models/models");
const ApiError = require("../error/ApiError");

class ParticipantController {
  async create(req, res, next) {
    try {
      const { name, participantTypeId } = req.body;

      if (!name) {
        return next(ApiError.badRequest("Ошибка создания участника: Название не указано!"));
      }
      if (!participantTypeId) {
        return next(ApiError.badRequest("Ошибка создания участника: ID типа участника не указан!"));
      }

      const participant = await Participant.create({ name, participantTypeId });
      return res.json(participant);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async get(req, res, next) {
    try {
      const { id } = req.query;

      let data;
      if (!id) {
        data = await Participant.findAll();
      } else if (id) {
        data = await Participant.findOne({ where: { id } });
      }

      return res.json(data);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new ParticipantController();
