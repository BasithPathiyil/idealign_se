const express = require("express");
const { auth } = require("../middlewares/auth");
const { projectsController } = require("../controllers");

const router = express.Router();

router.post("/add", projectsController.createProject);
router.get("/get", projectsController.getAllProjects);

module.exports = router;
