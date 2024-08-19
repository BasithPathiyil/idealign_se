const express = require("express");
const { auth } = require("../middlewares/auth");
const { newsEventsController } = require("../controllers");

const router = express.Router();

router.post("/add", auth, newsEventsController.createNews);
router.get("/get", newsEventsController.getAllNews);
router.get("/featured", newsEventsController.getAllFeaturedNews);
router.delete("/delete", auth, newsEventsController.deleteNews);
router.put("/edit", auth, newsEventsController.editNews);

module.exports = router;
