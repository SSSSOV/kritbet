const { City } = require("../models/models");
const ApiError = require("../error/ApiError");

class CityController {
    async create(req, res, next) {
        try {
            const { name, countryId } = req.body;
            const city = await City.create({ name, countryId });
            return res.json(city);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getAll(req, res) {
        const { countryId } = req.query;
        let cities;

        if (!countryId) {
            cities = await City.findAll();
        }

        if (countryId) {
            cities = await City.findAll({ where: { countryId } });
        }

        return res.json(cities);
    }
    async getOne(req, res) {
        const { id } = req.params;
        const city = City.findOne({ where: { id } });
    }
}

module.exports = new CityController();
