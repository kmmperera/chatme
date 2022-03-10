const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const multer = require("multer");
const shortid = require("shortid");


const accessKeyId = process.env.accessKeyId;
const secretAccessKey = process.env.secretAccessKey;
const buketname=process.env.bucket;

const s3 = new aws.S3({
  accessKeyId,
  secretAccessKey,
});


exports.s3middleware = multer({
  storage: multerS3({
    s3: s3,
    bucket: "mernecombucket",
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, shortid.generate() + "-" + file.originalname);
    },
  }),
});



