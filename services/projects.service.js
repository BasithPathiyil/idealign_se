const Projects = require("../models/projects.model");
const { upload } = require("../utils/multerFileUpload");

const removeFromDirectory = async (filePath) => {
  return await fs.unlinkSync(filePath);
};

const createProject = (req, res) => {
  return new Promise((resolve, reject) => {
    const multipleUpload = upload.fields([
      { name: "mainImage", maxCount: 1 },
      { name: "otherImages", maxCount: 8 },
    ]);

    multipleUpload(req, res, async function (err) {
      const deleteFile = (error) => {
        if (req.file) {
          fs.unlinkSync(req.file.path);
        }
        reject(error);
      };

      if (err) {
        console.log("error", err);
        deleteFile(new AppError(400, err.message));
      } else {
        try {
          console.log("req.files", req.files);
          let randomFaces = [];
          console.log("req.body", req.body);

          req?.files?.otherImages?.forEach((item) => {
            randomFaces.push(item.filename);
          });
          req.body.mainImage = req.files.mainImage[0].filename;
          req.body.otherImages = randomFaces;
          const createdData = await Projects.create(req.body);

          resolve(createdData);
        } catch (error) {
          deleteFile(error);
        }
      }
    });
  });
};

const getAllProjects = async () => {
  return await Projects.find();
};

module.exports = {
  createProject,
  getAllProjects,
};
