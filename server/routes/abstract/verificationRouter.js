// server\routes\verificationRouter.js
const Router = require("express");
const router = new Router();
const verificationController = require("../../controllers/abstract/verificationController");

router.post("/", verificationController.create);
router.get("/", verificationController.get);

module.exports = router;
