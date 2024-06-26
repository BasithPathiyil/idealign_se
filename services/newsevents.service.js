const Blogs = require("../models/blogs.model");
const Newsevents = require("../models/newsevents.model");
const { upload } = require("../utils/multerFileUpload");

const fs = require("fs");

const removeFromDirectory = async (image) => {
  return await fs.unlinkSync(`public\\uploads\\${image}`);
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

const deleteNews = async (objectId) => {
  const deletedDoc = await Newsevents.findByIdAndDelete(objectId);
  await removeFromDirectory(deletedDoc.mainImage);
  return deletedDoc;
};

module.exports = {
  getAllNews,
  createNews,
  deleteNews,
};
