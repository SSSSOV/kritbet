// server\controllers\countryController.js
const { Country } = require("../models/models");
const ApiError = require("../error/ApiError");

class CountryController {
  async create(req, res, next) {
    try {
      const { name } = req.body;

      if (!name) {
        return next(ApiError.unauthorized("Ошибка создания страны: Название не указано!"));
      }

      const country = await Country.create({ name });
      return res.json(country);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async get(req, res, next) {
    try {
      const { id, name } = req.query;

      let data;

      if (!id && !name) {
        data = await Country.findAll();
      } else if (id) {
        data = await Country.findOne({ where: { id } });
      } else if (name) {
        data = await Country.findOne({ where: { name } });
      }
      return res.json(data);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new CountryController();
