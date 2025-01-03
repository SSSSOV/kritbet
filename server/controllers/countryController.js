const { Country } = require("../models/models");
const ApiError = require("../error/ApiError");

class CountryController {
    async create(req, res) {
        const { name } = req.body;
        const country = await Country.create({ name });
        return res.json(country);
    }
    async getAll(req, res) {
        const countries = await Country.findAll();
        return res.json(countries);
    }
    async getOne(req, res) {}
}

module.exports = new CountryController();
