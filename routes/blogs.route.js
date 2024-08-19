const express = require("express");
const { auth } = require("../middlewares/auth");
const { blogsController } = require("../controllers");

const router = express.Router();

router.post("/add", auth, blogsController.createBlog);
router.get("/get", blogsController.getAllBlogs);
router.get("/featured", blogsController.getAllFeaturedBlogs);
router.delete("/delete", auth, blogsController.deleteBlog);
router.put("/edit", auth, blogsController.editBlog);

module.exports = router;
