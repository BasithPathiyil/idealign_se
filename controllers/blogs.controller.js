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

module.exports = {
  createBlog,
  getAllBlogs,
};
