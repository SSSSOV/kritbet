const Router = require("express");
const router = new Router();

const betRouter = require("./betRouter");
const userRouter = require("./userRouter");
const cityRouter = require("./cityRouter");
const matchRouter = require("./matchRouter");
const eventRouter = require("./eventRouter");
const countryRouter = require("./countryRouter");
const participantTypeRouter = require("./participantTypeRouter");
const participantSportRouter = require("./participantSportRouter");

router.use("/bet", betRouter);
router.use("/user", userRouter);
router.use("/city", cityRouter);
router.use("/event", eventRouter);
router.use("/match", matchRouter);
router.use("/country", countryRouter);
router.use("/participant/type", participantTypeRouter);
router.use("/participant/sport", participantSportRouter);

module.exports = router;
