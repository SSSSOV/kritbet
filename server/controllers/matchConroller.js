// server/controllers/matchController.js
const { Match, MatchParticipant, MatchSport, Participant } = require("../models/models");
const ApiError = require("../error/ApiError");

class MatchController {
  async create(req, res, next) {
    try {
      const { name, date, matchStatusId, matchSportId, locationId, participantIds } = req.body;

      if (!name) {
        return next(ApiError.badRequest("Ошибка создания матча: Имя не указано!"));
      }
      if (!date) {
        return next(ApiError.badRequest("Ошибка создания матча: Дата не указана!"));
      }
      if (!matchStatusId) {
        return next(ApiError.badRequest("Ошибка создания матча: ID статуса не указан!"));
      }
      if (!matchSportId) {
        return next(ApiError.badRequest("Ошибка создания матча: ID спорта не указан!"));
      }
      if (!locationId) {
        return next(ApiError.badRequest("Ошибка создания матча: ID локации не указан!"));
      }
      if (!participantIds) {
        return next(ApiError.badRequest("Ошибка создания матча: ID игроков не указаны!"));
      }
      const match = await Match.create({ name, date, matchStatusId, matchSportId, locationId });

      participantIds.map(async (participantId) => {
        await MatchParticipant.create({ matchId: match["id"], participantId });
      });
      return res.json(match);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async edit(req, res, next) {
    try {
      const { matchId, matchStatusId } = req.body;

      if (!matchId) {
        return next(ApiError.badRequest("Ошибка изменения матча: ID матча не указан!"));
      }

      let match;
      if (matchStatusId) {
        match = await Match.update({ matchStatusId }, { where: { id: matchId }, returning: true });
      } else {
        return next(
          ApiError.badRequest("Ошибка изменения матча: Коэффициент или ID статуса не указан!")
        );
      }
      return res.json(match[1][0]);
    } catch (error) {
      next(error);
    }
  }

  async get(req, res, next) {
    try {
      const { id, name, date, matchSportId } = req.query;

      let data;

      if (!id && !name && !date && !matchSportId) {
        data = await Match.findAll({
          include: [{ model: Participant, as: "participants" }],
        });
      } else if (id) {
        const matches = await Match.findOne({ where: { id } });

        if (matches) {
          const participants = await MatchParticipant.findAll({
            where: { matchId: id },
          });

          // Извлекаем только идентификаторы участников
          const participantIds = participants.map((participant) => participant.id);

          // Добавляем поле participantIds в объект матча
          data = {
            ...matches.dataValues,
            participantIds,
          };
        }
      } else if (name) {
        // Получаем матчи по указанному названию
        const matches = await Match.findAll({ where: { name } });

        // Создаем массив для хранения матчей с участниками
        data = await Promise.all(
          matches.map(async (match) => {
            // Получаем участников для текущего матча
            const participants = await MatchParticipant.findAll({
              where: { matchId: match.id },
            });

            // Извлекаем только идентификаторы участников
            const participantIds = participants.map((participant) => participant.id);

            // Формируем объект матча с добавленным полем participantIds
            return {
              ...match.dataValues,
              participantIds,
            };
          })
        );
      } else if (date) {
        // Получаем матчи по указанной дате
        const matches = await Match.findAll({ where: { date } });

        // Создаем массив для хранения матчей с участниками
        data = await Promise.all(
          matches.map(async (match) => {
            // Получаем участников для текущего матча
            const participants = await MatchParticipant.findAll({
              where: { matchId: match.id },
            });

            // Извлекаем только идентификаторы участников
            const participantIds = participants.map((participant) => participant.id);

            // Формируем объект матча с добавленным полем participantIds
            return {
              ...match.dataValues,
              participantIds,
            };
          })
        );
      } else if (matchSportId) {
        // Получаем матчи по указанному спорту
        data = await Match.findAll({
          where: { matchSportId },
          include: [{ model: Participant, as: "participants" }],
        });
      }
      return res.json(data);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new MatchController();
