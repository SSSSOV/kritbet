// server\routes\matchRouter.js
const Router = require("express");
const { create, edit, get } = require("../controllers/matchConroller");
const router = new Router();

router.post("/", create);
router.patch("/", edit);
router.get("/", get);

module.exports = router;
