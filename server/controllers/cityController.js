// server\controllers\cityController.js
const { City } = require("../models/models");
const ApiError = require("../error/ApiError");

class CityController {
  async create(req, res, next) {
    try {
      const { name, countryId } = req.body;

      if (!name) {
        return next(ApiError.badRequest("Ошибка создания города: Название не указано!"));
      }
      if (!countryId) {
        return next(ApiError.badRequest("Ошибка создания города: ID страны не указано!"));
      }

      const city = await City.create({ name, countryId });
      return res.json(city);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async get(req, res, next) {
    try {
      const { id, countryId } = req.query;

      let data;
      if (!id && !countryId) {
        data = await City.findAll();
      } else if (id) {
        data = await City.findOne({ where: { id } });
      } else if (countryId) {
        data = await City.findAll({ where: { countryId } });
      }

      return res.json(data);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new CityController();
