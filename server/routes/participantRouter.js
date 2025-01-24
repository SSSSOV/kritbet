// server\routes\participantRouter.js
const Router = require("express");
const participantController = require("../controllers/participantController");
const router = new Router();

router.post("/", participantController.create);
router.get("/", participantController.get);

module.exports = router;
