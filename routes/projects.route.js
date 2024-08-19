const express = require("express");
const { auth } = require("../middlewares/auth");
const { projectsController } = require("../controllers");

const router = express.Router();

router.post("/add", auth, projectsController.createProject);
router.get("/get", projectsController.getAllProjects);
router.get("/:category/get", projectsController.getAllCategoryProjects);
router.get("/featured", projectsController.getAllFeaturedProjects);
router.delete("/delete", auth, projectsController.deleteProject);
router.put("/edit", auth, projectsController.editProject);

module.exports = router;
