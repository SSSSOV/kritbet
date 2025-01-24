// server\controllers\verificationController.js
const { UserVerification } = require("../../models/models");
const ApiError = require("../../error/ApiError");

class VerificationController {
  async create(req, res, next) {
    try {
      const { name } = req.body;

      if (!name) {
        return next(
          ApiError.unauthorized("Ошибка создания статуса верификации: Название не указано!")
        );
      }

      const verefication = await UserVerification.create({ name });
      return res.json(verefication);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async get(req, res, next) {
    try {
      const { id, name } = req.query;

      let verefication;

      if (!id && !name) {
        verefication = await UserVerification.findAll();
      } else if (id) {
        verefication = await UserVerification.findOne({ where: { id } });
      } else if (name) {
        verefication = await UserVerification.findOne({ where: { name } });
      }
      return res.json(verefication);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new VerificationController();
