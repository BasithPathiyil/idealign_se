const express = require("express");
const userRoute = require("./user.route");

const projectsRoute = require("./projects.route");
const blogsRoute = require("./blogs.route");
const newsEventsRoute = require("./newsevents.route");
const contactFormRoute = require("./contactform.route");
const statsRoute = require("./stats.route");
const { verifytoken } = require("../middlewares/auth");

const router = express.Router();

router.post("/verify_token", verifytoken);
router.use("/user", userRoute);
router.use("/projects", projectsRoute);
router.use("/blogs", blogsRoute);
router.use("/newsevents", newsEventsRoute);
router.use("/contactform", contactFormRoute);
router.use("/stats", statsRoute);

module.exports = router;
