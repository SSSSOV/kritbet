// server\routes\abstract\betTypeRouter.js
const Router = require("express");
const router = new Router();
const betTypeController = require("../../controllers/abstract/betTypeController");

router.post("/", betTypeController.create);
router.get("/", betTypeController.get);

module.exports = router;
