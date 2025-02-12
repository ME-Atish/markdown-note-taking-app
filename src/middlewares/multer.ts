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
    cb(null, `${timestamp}${ext}`);
  },
});

// Filter to allow only `.md` files
const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === ".md") {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Only .md files are allowed"), false); // Reject the file
  }
};

const upload = multer({
  storage,
  fileFilter,
});

export default upload;
