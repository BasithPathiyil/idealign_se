const Newsevents = require("../models/newsevents.model");
const { upload } = require("../utils/multerFileUpload");

const fs = require("fs");

const removeFromDirectory = async (image) => {
  try {
    return await fs.unlinkSync(`public\\uploads\\${image}`);
  } catch (error) {
    console.log("error", error);
  }
};
const createNews = (req, res) => {
  return new Promise((resolve, reject) => {
    const multipleUpload = upload.fields([
      { name: "mainImage", maxCount: 1 },
      //   { name: "otherImages", maxCount: 8 },
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
          //   let randomFaces = [];
          console.log("req.body", req.body);

          //   req.files.otherImages.forEach((item) => {
          //     randomFaces.push(item.filename);
          //   });
          req.body.mainImage = req.files.mainImage[0].filename;
          //   req.body.otherImages = randomFaces;
          const createdData = await Newsevents.create(req.body);

          resolve(createdData);
        } catch (error) {
          deleteFile(error);
        }
      }
    });
  });
};

const getAllNews = async () => {
  return await Newsevents.find();
};
const getAllFeaturedNews = async () => {
  return await Newsevents.find({ featured: true });
};
const deleteNews = async (objectId) => {
  const deletedDoc = await Newsevents.findByIdAndDelete(objectId);
  await removeFromDirectory(deletedDoc.mainImage);
  return deletedDoc;
};

const editNews = (req, res) => {
  return new Promise((resolve, reject) => {
    const multipleUpload = upload.fields([{ name: "mainImage", maxCount: 1 }]);

    multipleUpload(req, res, async function (err) {
      const deleteFile = (error) => {
        if (req.files.mainImage[0]) {
          removeFromDirectory(req.file.mainImage[0].filename);
        }
        reject(error);
      };

      if (err) {
        console.log("error", err);
        deleteFile(new AppError(400, err.message));
      } else {
        try {
          const projectData = await Newsevents.findById(req.query.id);
          console.log("productData", projectData);
          let editProjectData;
          console.log("req", req.body);
          console.log("req.file", req.files);
          if (!Object.keys(req.files).length) {
            editProjectData = await Newsevents.updateOne(
              { _id: req.query.id },
              { $set: req.body }
            );
          } else {
            console.log("working2");
            let mainImage;
            if (req.files.mainImage && req.files.mainImage.length) {
              mainImage = req.files.mainImage[0].filename;
            }

            if (mainImage) {
              req.body.mainImage = mainImage;
              await removeFromDirectory(req.body.removedMainImage);
            }

            editProjectData = await Newsevents.updateOne(
              { _id: req.query.id },
              { $set: req.body }
            );
          }

          resolve(editProjectData);
        } catch (error) {
          console.log("Error", error);
          deleteFile(error);
        }
      }
    });
  });
};

const featuredCount = async () => {
  let count = await Newsevents.countDocuments({ featured: true });
  return count;
};

module.exports = {
  getAllNews,
  createNews,
  deleteNews,
  editNews,
  featuredCount,
  getAllFeaturedNews,
};
