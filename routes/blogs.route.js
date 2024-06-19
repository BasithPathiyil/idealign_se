const express = require("express");
const { auth } = require("../middlewares/auth");
const { blogsController } = require("../controllers");

const router = express.Router();

router.post("/add", blogsController.createBlog);
router.get("/get", blogsController.getAllBlogs);

module.exports = router;
