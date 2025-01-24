// server\routes\abstract\betStatusRouter.js
const Router = require("express");
const router = new Router();
const betStatusController = require("../../controllers/abstract/betStatusController");

router.post("/", betStatusController.create);
router.get("/", betStatusController.get);

module.exports = router;
