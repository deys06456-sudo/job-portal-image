const path = require("path");
const fs = require("fs");
const multer = require("multer");

const FILE_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg",
    "image/gif": "gif"
};

// Create uploads folder if it doesn't exist
const uploadDir = "uploads";

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const extension = FILE_TYPE_MAP[file.mimetype];
        if (!extension) {
            return cb(new Error("Invalid image type"));
        }
        cb(null, uploadDir);
    },

    filename: function (req, file, cb) {
        const fileName = path.basename(
            file.originalname,
            path.extname(file.originalname)
        );

        const extension = FILE_TYPE_MAP[file.mimetype];
        cb( null,`${fileName.split(" ").join("-")}-${Date.now()}.${extension}`);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;