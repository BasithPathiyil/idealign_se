const express = require("express");
const { auth } = require("../middlewares/auth");
const { statsController } = require("../controllers");

const router = express.Router();

router.get("/", statsController.getHomeStatus);

module.exports = router;
