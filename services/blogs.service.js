const AppError = require("../middlewares/AppError");
const Blogs = require("../models/blogs.model");
const { upload } = require("../utils/multerFileUpload");

const fs = require("fs");

const removeFromDirectory = async (image) => {
  return await fs.unlinkSync(`public\\uploads\\${image}`);
};

const createBlog = (req, res) => {
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
          const createdData = await Blogs.create(req.body);

          resolve(createdData);
        } catch (error) {
          deleteFile(error);
        }
      }
    });
  });
};

const getAllBlogs = async () => {
  return await Blogs.find();
};

const deleteBlog = async (objectId) => {
  const deletedDoc = await Blogs.findByIdAndDelete(objectId);
  await removeFromDirectory(deletedDoc.mainImage);
  return deletedDoc;
};

const editBlog = (req, res) => {
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
          const projectData = await Blogs.findById(req.query.id);
          console.log("productData", projectData);
          let editProjectData;
          console.log("req", req.body);
          console.log("req.file", req.files);
          if (!Object.keys(req.files).length) {
            editProjectData = await Blogs.updateOne(
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

            editProjectData = await Blogs.updateOne(
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

module.exports = {
  getAllBlogs,
  createBlog,
  deleteBlog,
  editBlog,
};
