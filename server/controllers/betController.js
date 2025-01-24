// server\controllers\betController.js
const { Bet, User, BetEvent, Event } = require("../models/models");
const ApiError = require("../error/ApiError");

class BetController {
  async create(req, res, next) {
    try {
      const { coefficient, bet_amount, userId, betStatusId, betTypeId, userLogin, betEventsId } =
        req.body;

      if (!coefficient) {
        return next(ApiError.badRequest("Ошибка создания ставки: Коэффициент не указан!"));
      }
      if (!bet_amount) {
        return next(ApiError.badRequest("Ошибка создания ставки: Сумма не указана!"));
      }
      if (!userId && !userLogin) {
        return next(
          ApiError.badRequest("Ошибка создания ставки: ID или логин пользователя не указаны!")
        );
      }
      if (!betStatusId) {
        return next(ApiError.badRequest("Ошибка создания ставки: ID статуса не указан!"));
      }
      if (!betTypeId) {
        return next(ApiError.badRequest("Ошибка создания ставки: ID типа не указан!"));
      }
      if (!betEventsId) {
        return next(ApiError.badRequest("Ошибка создания ставки: ID событий неуказаны!"));
      }
      let user_id;
      if (!userId) {
        let user = await User.findOne({ where: { login: userLogin } });
        if (!user)
          return next(ApiError.badRequest("Ошибка создания ставки: Пользователь не найден!"));
        user_id = user.id;
      } else user_id = userId;

      const bet = await Bet.create({
        coefficient,
        bet_amount,
        userId: user_id,
        betStatusId,
        betTypeId,
      });

      betEventsId.map((eventId) => {
        BetEvent.create({ betId: bet.id, eventId });
      });

      return res.json(bet);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async edit(req, res, next) {
    try {
      const { id, coefficient, betStatusId } = req.body;

      if (!id) {
        return next(ApiError.badRequest("Ошибка изменения ставки: ID ставки не указан!"));
      }

      let bet;
      if (coefficient && betStatusId) {
        bet = await Bet.update({ coefficient, betStatusId }, { where: { id }, returning: true });
      } else if (coefficient) {
        bet = await Bet.update({ coefficient }, { where: { id }, returning: true });
      } else if (betStatusId) {
        bet = await Bet.update({ betStatusId }, { where: { id }, returning: true });
      } else {
        return next(
          ApiError.badRequest("Ошибка изменения ставки: коэффициент или ID статуса не указан!")
        );
      }

      return res.json(bet[1][0]);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async get(req, res, next) {
    try {
      const { id, userId } = req.query;

      if (!id && !userId) {
        return next(
          ApiError.unauthorized("Ошибка получения ставок: ID ставки или пользователя не указан!")
        );
      }

      let bet;
      if (id) {
        bet = await Bet.findOne({ where: { id } });
      } else if (userId) {
        bet = await Bet.findAll({
          where: { userId },
          include: [{ model: Event, as: "events" }],
        });
      }

      return res.json(bet);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new BetController();
