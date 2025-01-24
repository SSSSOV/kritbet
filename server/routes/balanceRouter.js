// server\routes\balanceRouter.js
const Router = require("express");
const router = new Router();
const balanceController = require("../controllers/balanceController");

router.get("/", balanceController.get);

module.exports = router;
