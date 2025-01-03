const { ParticipantType } = require("../models/models");
const ApiError = require("../error/ApiError");

class ParticipantTypeController {
    async create(req, res) {
        const { name } = req.body;
        const participantType = await ParticipantType.create({ name });
        return res.json(participantType);
    }
    async getAll(req, res) {
        const participantTypes = await ParticipantType.findAll();
        return res.json(participantTypes);
    }
    async getOne(req, res) {}
}

module.exports = new ParticipantTypeController();
