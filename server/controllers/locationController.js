// server\controllers\locationController.js
const { Location } = require("../models/models");
const ApiError = require("../error/ApiError");

class LocationController {
  async create(req, res, next) {
    try {
      const { name, cityId, capacity } = req.body;

      if (!name) {
        return next(ApiError.badRequest("Ошибка создания локации: Название не указано!"));
      }
      if (!cityId) {
        return next(ApiError.badRequest("Ошибка создания локауии: ID города не указано!"));
      }
      if (!capacity) {
        return next(ApiError.badRequest("Ошибка создания локауии: Вместимость не указана!"));
      }

      const location = await Location.create({ name, cityId, capacity });
      return res.json(location);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async get(req, res, next) {
    try {
      const { id, cityId } = req.query;

      let data;
      if (!id && !cityId) {
        data = await Location.findAll();
      } else if (id) {
        data = await Location.findOne({ where: { id } });
      } else if (cityId) {
        data = await Location.findAll({ where: { cityId } });
      }

      return res.json(data);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new LocationController();
