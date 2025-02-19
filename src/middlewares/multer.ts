import * as multer from "multer";
import * as path from "path";
import * as fs from "fs";

const uploadPath = path.join(__dirname, "../uploads");

// Ensure the uploads directory exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${timestamp}${ext}`);
  },
});

// File filter to allow only Markdown files
const fileFilter = (req: any, file: any, cb: any) => {
  if (path.extname(file.originalname).toLowerCase() === ".md") {
    cb(null, true);
  } else {
    cb(new Error("Only Markdown (.md) files are allowed"), false);
  }
};

export default multer({ storage, fileFilter });
