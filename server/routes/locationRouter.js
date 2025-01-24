// server\routes\locationRouter.js
const Router = require("express");
const router = new Router();
const checkRole = require("../middleware/checkRoleMiddleware");
const locationController = require("../controllers/locationController");

router.post("/", checkRole("ADMIN"), locationController.create);
router.get("/", locationController.get);

module.exports = router;
