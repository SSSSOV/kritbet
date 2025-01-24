// server\routes\abstract\matchStatusRouter.js
const Router = require("express");
const router = new Router();
const matchStatusController = require("../../controllers/abstract/matchStatusController");

router.post("/", matchStatusController.create);
router.get("/", matchStatusController.get);

module.exports = router;
