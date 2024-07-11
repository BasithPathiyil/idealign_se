const { projectsService, blogsService, newsService } = require("../services");
const { tryCatch } = require("../utils/tryCatch");

const getHomeStatus = tryCatch(async (req, res, next) => {
  const [projectCount, blogsCount, newsCount] = await Promise.all([
    projectsService.featuredCount(),
    blogsService.featuredCount(),
    newsService.featuredCount(),
  ]);
  res.status(200).json({
    status: true,
    statuscode: 200,
    result: {
      projectCount,
      blogsCount,
      newsCount,
    },
  });
});

module.exports = {
  getHomeStatus,
};
