const AppError = require("../middlewares/AppError");
const Projects = require("../models/projects.model");
const { upload } = require("../utils/multerFileUpload");

const fs = require("fs");

const removeFromDirectory = async (image) => {
  try {
    return await fs.unlinkSync(`public\\uploads\\${image}`);
  } catch (error) {
    console.log("error", error);
  }
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

const deleteProject = async (objectId) => {
  const deletedDoc = await Projects.findByIdAndDelete(objectId);
  await removeFromDirectory(deletedDoc.mainImage);
  if (deletedDoc.otherImages.length) {
    deletedDoc.otherImages.forEach(async (item) => {
      await removeFromDirectory(item);
    });
  }
  return deletedDoc;
};

const editProject = (req, res) => {
  return new Promise((resolve, reject) => {
    const multipleUpload = upload.fields([
      { name: "mainImage", maxCount: 1 },
      { name: "otherImages", maxCount: 8 },
    ]);

    multipleUpload(req, res, async function (err) {
      const deleteFile = (error) => {
        if (req.file.mainImage[0]) {
          removeFromDirectory(req.file.mainImage[0].filename);
        }
        reject(error);
      };

      if (err) {
        console.log("error", err);
        deleteFile(new AppError(400, err.message));
      } else {
        try {
          const projectData = await Projects.findById(req.query.id);
          console.log("productData", projectData);
          let editProjectData;
          console.log("req", req.body);
          console.log("req.file", req.files);
          if (!Object.keys(req.files).length) {
            console.log("working");
            if (req.body.removedImages) {
              let images = JSON.parse(req.body.removedImages);

              console.log("images", images);
              req.body.otherImages = projectData.otherImages.filter(
                (value) => !images.includes(value)
              );
              images.forEach(async (image) => {
                // let path = generateFilePath(image);
                removeFromDirectory(image);
              });
              delete req.body.removedImages;
            }

            editProjectData = await Projects.updateOne(
              { _id: req.query.id },
              { $set: req.body }
            );
          } else {
            console.log("working2");
            let mainImage;
            let otherImages = [];
            if (req.files.mainImage && req.files.mainImage.length) {
              mainImage = req.files.mainImage[0].filename;
            }
            if (req.files.otherImages && req.files.otherImages.length) {
              req.files.otherImages.forEach((item) => {
                otherImages.push(item.filename);
              });
            }

            if (mainImage) {
              req.body.mainImage = mainImage;
              await removeFromDirectory(req.body.removedMainImage);
            }
            let allFaces = projectData.otherImages.concat(otherImages);
            req.body.otherImages = allFaces;
            if (req.body.removedImages) {
              let parsedImages = JSON.parse(req.body.removedImages);
              console.log("parsedImages", parsedImages);
              let filteredImages = allFaces.filter(
                (value) => !parsedImages?.includes(value)
              );
              console.log("filteredImages", filteredImages);
              req.body.otherImages = filteredImages;
              parsedImages.forEach(async (image) => {
                // let path = generateFilePath(image);
                removeFromDirectory(image);
              });
            }

            editProjectData = await Projects.updateOne(
              { _id: req.query.id },
              { $set: req.body }
            );
          }

          resolve(editProjectData);
        } catch (error) {
          deleteFile(error);
        }
      }
    });
  });
};

module.exports = {
  createProject,
  getAllProjects,
  deleteProject,
  editProject,
};
