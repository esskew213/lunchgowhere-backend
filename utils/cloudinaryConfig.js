// const express = require("express");
// // const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const multer = require("multer");
// const cloudinary = require("cloudinary");

// const app = express();

// const cloudinaryConfig = cloudinary.config({
//   cloud_name: "dgalezcxh",
//   api_key: "896965788323377",
//   api_secret: "_TdDlHAnyogHvEGb6r0Uw0wY448",
// });

// // const stallStorage = new CloudinaryStorage({
// //   cloudinary: cloudinary,
// //   params: {
// //     folder: "stall",
// //   },
// // });

// // const upload = multer({ storage: stallStorage });

// // app.post("/multerUpload", upload.single("picture"), async (req, res) => {
// //   return res.json({ picture: req.file.path });
// // });

// module.exports = cloudinaryConfig;

import { config, uploader } from "cloudinary";
const cloudinaryConfig = () =>
  config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
export { cloudinaryConfig, uploader };
