const aws = require("aws-sdk");
const dotenv = require("dotenv");
const multer = require("multer");
const multerS3 = require("multer-s3-transform");
dotenv.config({ path: "../.env" });

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  region: process.env.AWS_S3_BUCKET_REGION,
});

const s3 = new aws.S3();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/");
  },
  filename: (req, file, cb) => {
    const originalname = file.originalname;
    const extension = originalname.slice(
      ((originalname.lastIndexOf(".") - 1) >>> 0) + 2
    );
    cb(null, `${Date.now()}.${extension}`);
  },
});

const upload = multer({ storage });

const storageMultiple = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("working");
    console.log("file", file);
    cb(null, "./public/uploads/");
  },
  filename: (req, file, cb) => {
    const originalname = file.originalname;
    const extension = originalname.slice(
      ((originalname.lastIndexOf(".") - 1) >>> 0) + 2
    );
    cb(null, `${Date.now()}.${extension}`);
  },
});

const uploadMultiple = multer({ storage: storageMultiple });

const deleteFileFromS3Bucket = (keyId) => {
  const params = {
    Bucket: "ablceramictesting2",
    Key: keyId,
  };
  s3.deleteObject(params, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("Succesfully deleted");
    }
  });
};

const storageS3 = multerS3({
  s3: s3,
  bucket: "ablceramictesting2",
  acl: "public-read",
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    const originalname = file.originalname;
    const extension = originalname.slice(
      ((originalname.lastIndexOf(".") - 1) >>> 0) + 2
    );
    cb(null, `${Date.now()}.${extension}`);
  },
});
const uploadS3 = multer({ storage: storageS3 });

module.exports = {
  upload,
  uploadMultiple,
  uploadS3,
  deleteFileFromS3Bucket,
};
