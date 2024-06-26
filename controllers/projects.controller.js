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
const deleteProject = tryCatch(async (req, res, next) => {
  const deleteObj = await projectsService.deleteProject(req.query.id);
  res.status(200).json({
    status: true,
    statuscode: 200,
    deleteObj,
  });
});

const editProject = tryCatch(async (req, res, next) => {
  const deleteObj = await projectsService.editProject(req, res);
  res.status(200).json({
    status: true,
    statuscode: 200,
    deleteObj,
  });
});

module.exports = {
  createProject,
  getAllProjects,
  deleteProject,
  editProject,
};
