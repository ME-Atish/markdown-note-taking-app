import * as multer from "multer";
import * as path from "path";
import * as fs from "fs";
const uploadPath = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const filename = Date;
    const ext = path.extname(file.originalname);
    cb(null, `${filename}${ext}`);
  },
});

const allowedExtensions = [".md"];

const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedExtensions.includes(ext)) {
    cb(null, true); // Accept the file
  } else {
    cb(
      new Error(
        `Only the following file types are allowed: ${allowedExtensions.join(
          ", "
        )}`
      ),
      false
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
});

export default upload;
