const express = require("express");
const userRoute = require("./user.route");

const projectsRoute = require("./projects.route");
const blogsRoute = require("./blogs.route");

const router = express.Router();

router.use("/user", userRoute);
router.use("/projects", projectsRoute);
router.use("/blogs", blogsRoute);

module.exports = router;
