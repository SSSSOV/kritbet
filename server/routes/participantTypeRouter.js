const Router = require("express");
const router = new Router();
const participantTypeController = require("../controllers/participantTypeController");

router.post("/", participantTypeController.create);
router.get("/", participantTypeController.getAll);
router.get("/:id", participantTypeController.getOne);

module.exports = router;
