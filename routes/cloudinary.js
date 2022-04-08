const router = express.router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

router.post("/", upload.single("image"), async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
