const { blogsService } = require("../services");
const { tryCatch } = require("../utils/tryCatch");

const createBlog = tryCatch(async (req, res, next) => {
  let objResult = await blogsService.createBlog(req, res);
  res.status(200).json({
    status: true,
    statuscode: 200,
    message: "uploaded",
    objResult,
  });
});

const getAllBlogs = tryCatch(async (req, res, next) => {
  const arrList = await blogsService.getAllBlogs();
  res.status(200).json({
    status: true,
    statuscode: 200,
    arrList,
  });
});

const getAllFeaturedBlogs = tryCatch(async (req, res, next) => {
  const arrList = await blogsService.getAllFeaturedBlogs();
  res.status(200).json({
    status: true,
    statuscode: 200,
    arrList,
  });
});

const deleteBlog = tryCatch(async (req, res, next) => {
  const deleteObj = await blogsService.deleteBlog(req.query.id);
  res.status(200).json({
    status: true,
    statuscode: 200,
    deleteObj,
  });
});
const editBlog = tryCatch(async (req, res, next) => {
  const deleteObj = await blogsService.editBlog(req, res);
  res.status(200).json({
    status: true,
    statuscode: 200,
    deleteObj,
  });
});
module.exports = {
  createBlog,
  getAllBlogs,
  deleteBlog,
  editBlog,
  getAllFeaturedBlogs,
};
