const Router = require("express");
const router = new Router();
const cityController = require("../controllers/cityController");

router.post("/", cityController.create);
router.get("/", cityController.getAll);
router.get("/:id", cityController.getOne);

module.exports = router;
