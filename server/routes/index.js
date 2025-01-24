// server\routes\index.js
const Router = require("express");
const router = new Router();

const userRouter = require("./userRouter");
const balanceRouter = require("./balanceRouter");
const betRouter = require("./betRouter");
const eventRouter = require("./eventRouter");
const matchRouter = require("./matchRouter");
const sportRouter = require("./sportRouter");
const locationRouter = require("./locationRouter");
const cityRouter = require("./cityRouter");
const countryRouter = require("./countryRouter");
const participantRouter = require("./participantRouter");

router.use("/user", userRouter);
router.use("/balance", balanceRouter);
router.use("/bet", betRouter);
router.use("/event", eventRouter);
router.use("/match", matchRouter);
router.use("/sport", sportRouter);
router.use("/location", locationRouter);
router.use("/city", cityRouter);
router.use("/country", countryRouter);
router.use("/participant", participantRouter);

// abstract
const betStatusRouter = require("./abstract/betStatusRouter");
const betTypeRouter = require("./abstract/betTypeRouter");
const eventResultRouter = require("./abstract/eventResultRouter");
const matchStatusRouter = require("./abstract/matchStatusRouter");
const participantTypeRouter = require("./abstract/participantTypeRouter");
const verificationRouter = require("./abstract/verificationRouter");

router.use("/bet/status", betStatusRouter);
router.use("/bet/type", betTypeRouter);
router.use("/event/result", eventResultRouter);
router.use("/match/status", matchStatusRouter);
router.use("/participant/type", participantTypeRouter);
router.use("/verification", verificationRouter);

module.exports = router;
