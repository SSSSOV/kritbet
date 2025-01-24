// server\routes\sportRouter.js
const Router = require("express");
const router = new Router();
const sportController = require("../controllers/sportController");

router.post("/", sportController.create);
router.get("/", sportController.get);

module.exports = router;
