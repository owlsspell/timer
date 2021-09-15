const Router = require("express");
const router = new Router();
const userController = require("../controller/userController");
const timeController = require("../controller/timeController");

router.post("/user", userController.createUser);
router.get("/user", userController.logIn);
router.get("/getUser", userController.getUser);

router.post("/time", timeController.sendTime);

router.get("/time", timeController.getStatistics);
router.get("/time/dates", timeController.getStatisticsByDates);

module.exports = router;
