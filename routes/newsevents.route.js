const express = require("express");
const { auth } = require("../middlewares/auth");
const { newsEventsController } = require("../controllers");

const router = express.Router();

router.post("/add", newsEventsController.createNews);
router.get("/get", newsEventsController.getAllNews);
router.get("/featured", newsEventsController.getAllFeaturedNews);
router.delete("/delete", newsEventsController.deleteNews);
router.put("/edit", newsEventsController.editNews);

module.exports = router;
