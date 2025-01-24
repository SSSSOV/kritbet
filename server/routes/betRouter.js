// server\routes\betRouter.js
const Router = require("express");
const router = new Router();
const betController = require("../controllers/betController");

router.post("/", betController.create);
router.patch("/", betController.edit);
router.get("/", betController.get);

module.exports = router;
