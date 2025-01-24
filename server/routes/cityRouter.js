// server\routes\cityRouter.js
const Router = require("express");
const router = new Router();
const checkRole = require("../middleware/checkRoleMiddleware");
const cityController = require("../controllers/cityController");

router.post("/", checkRole("ADMIN"), cityController.create);
router.get("/", cityController.get);

module.exports = router;
