const Router = require("express");
const router = new Router();
const participantSportController = require("../controllers/participantSportController");

router.post("/", participantSportController.create);
router.get("/", participantSportController.getAll);
router.get("/:id", participantSportController.getOne);

module.exports = router;
