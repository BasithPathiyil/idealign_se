const express = require("express");
const { auth } = require("../middlewares/auth");
const { blogsController } = require("../controllers");

const router = express.Router();

router.post("/add", blogsController.createBlog);
router.get("/get", blogsController.getAllBlogs);
router.get("/featured", blogsController.getAllFeaturedBlogs);
router.delete("/delete", blogsController.deleteBlog);
router.put("/edit", blogsController.editBlog);

module.exports = router;
