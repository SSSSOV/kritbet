const { ParticipantSport } = require("../models/models");
const ApiError = require("../error/ApiError");

class ParticipantSportController {
    async create(req, res) {
        const { name } = req.body;
        const participantSport = await ParticipantSport.create({ name });
        return res.json(participantSport);
    }
    async getAll(req, res) {
        const participantSports = await ParticipantSport.findAll();
        return res.json(participantSports);
    }
    async getOne(req, res) {}
}

module.exports = new ParticipantSportController();
