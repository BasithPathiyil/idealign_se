const { projectsService } = require("../services");
const { tryCatch } = require("../utils/tryCatch");

const createProject = tryCatch(async (req, res, next) => {
  let objResult = await projectsService.createProject(req, res);
  res.status(200).json({
    status: true,
    statuscode: 200,
    message: "uploaded",
    objResult,
  });
});

const getAllProjects = tryCatch(async (req, res, next) => {
  const arrList = await projectsService.getAllProjects();
  res.status(200).json({
    status: true,
    statuscode: 200,
    arrList,
  });
});

module.exports = {
  createProject,
  getAllProjects,
};
