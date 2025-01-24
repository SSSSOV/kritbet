// server\routes\abstract\eventResultRouter.js
const Router = require("express");
const router = new Router();
const eventResultController = require("../../controllers/abstract/eventResultController");

router.post("/", eventResultController.create);
router.get("/", eventResultController.get);

module.exports = router;
