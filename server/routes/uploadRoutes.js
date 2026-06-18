const router     = require("express").Router();
const auth       = require("../middleware/authMiddleware");
const upload     = require("../middleware/uploadMiddleware");
const { uploadAndGenerate } = require("../controllers/uploadController");

router.post("/", auth, upload.array("documents", 5), uploadAndGenerate);

module.exports = router;