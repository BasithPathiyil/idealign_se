const express = require("express");
const { auth } = require("../middlewares/auth");
const { newsEventsController } = require("../controllers");

const router = express.Router();

router.post("/add", newsEventsController.createNews);
router.get("/get", newsEventsController.getAllNews);
router.delete("/delete", newsEventsController.deleteNews);

module.exports = router;
