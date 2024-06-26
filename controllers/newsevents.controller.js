const { blogsService, newsService } = require("../services");
const { tryCatch } = require("../utils/tryCatch");

const createNews = tryCatch(async (req, res, next) => {
  let objResult = await newsService.createNews(req, res);
  res.status(200).json({
    status: true,
    statuscode: 200,
    message: "uploaded",
    objResult,
  });
});

const getAllNews = tryCatch(async (req, res, next) => {
  const arrList = await newsService.getAllNews();
  res.status(200).json({
    status: true,
    statuscode: 200,
    arrList,
  });
});

const deleteNews = tryCatch(async (req, res, next) => {
  const deleteObj = await newsService.deleteNews(req.query.id);
  res.status(200).json({
    status: true,
    statuscode: 200,
    deleteObj,
  });
});

module.exports = {
  createNews,
  getAllNews,
  deleteNews,
};
