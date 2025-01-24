// server\routes\participantTypeRouter.js
const Router = require("express");
const router = new Router();
const participantTypeController = require("../../controllers/abstract/participantTypeController");

router.post("/", participantTypeController.create);
router.get("/", participantTypeController.get);

module.exports = router;
