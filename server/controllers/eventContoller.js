// server\controllers\eventContoller.js
const { Event } = require("../models/models");
const ApiError = require("../error/ApiError");

class EventController {
  async create(req, res, next) {
    try {
      const { name, coefficient, eventResultId, matchId } = req.body;

      if (!name) {
        return next(ApiError.badRequest("Ошибка создания события: Имя не указано!"));
      }
      if (!coefficient) {
        return next(ApiError.badRequest("Ошибка создания события: Коэффициент не указан!"));
      }
      if (!eventResultId) {
        return next(ApiError.badRequest("Ошибка создания события: ID результата не указан!"));
      }
      if (!matchId) {
        return next(ApiError.badRequest("Ошибка создания события: ID матча не указан!"));
      }

      const event = await Event.create({ name, coefficient, eventResultId, matchId });
      return res.json(event);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async edit(req, res, next) {
    try {
      const { eventId, coefficient, eventResultId } = req.body;

      console.log(req.body);

      if (!eventId) {
        return next(ApiError.badRequest("Ошибка изменения события: ID события не указан!"));
      }

      let event;
      if (coefficient && eventResultId) {
        event = await Event.update(
          { coefficient, eventResultId },
          { where: { id: eventId }, returning: true }
        );
      } else if (coefficient) {
        event = await Event.update({ coefficient }, { where: { id: eventId }, returning: true });
      } else if (eventResultId) {
        event = await Event.update({ eventResultId }, { where: { id: eventId }, returning: true });
      } else {
        return next(
          ApiError.badRequest("Ошибка изменения события: коэффициент или ID результата не указан!")
        );
      }

      return res.json(event[1][0]);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async get(req, res, next) {
    try {
      const { id, matchId } = req.query;

      let data;

      if (!id && !matchId) {
        data = await Event.findAll();
      } else if (id) {
        data = await Event.findOne({ where: { id } });
      } else if (matchId) {
        data = await Event.findAll({ where: { matchId } });
      }
      return res.json(data);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new EventController();
