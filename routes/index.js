const express = require("express");
const userRoute = require("./user.route");

const projectsRoute = require("./projects.route");
const blogsRoute = require("./blogs.route");
const newsEventsRoute = require("./newsevents.route");

const router = express.Router();

router.use("/user", userRoute);
router.use("/projects", projectsRoute);
router.use("/blogs", blogsRoute);
router.use("/newsevents", newsEventsRoute);

module.exports = router;
