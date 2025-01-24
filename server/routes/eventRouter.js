// server\routes\eventRouter.js
const Router = require("express");
const { create, edit, get } = require("../controllers/eventContoller");
const router = new Router();

router.post("/", create);
router.patch("/", edit);
router.get("/", get);

module.exports = router;
