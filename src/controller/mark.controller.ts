import { Request, Response } from "express";
import uploader from "../middlewares/multer";
import * as path from "path";
import * as fs from "fs";

const uploadFile = uploader.array("file", 12);
const storageFile = path.join(__dirname, "../uploads/");

export const upload = async (req: Request, res: Response) => {
  uploadFile(req, res, (err: any) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res
      .status(200)
      .json({ message: "Files uploaded successfully!", files: req.files });
  });
};

export const read = async (req: Request, res: Response) => {
  const storagePath = path.join(__dirname, "../uploads/");

  fs.readdir(storagePath, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return res.status(500).json({ error: "Error reading directory" });
    }

    const fileContents = files.map((file) => {
      const filePath = path.join(storagePath, file);
      try {
        const content = fs.readFileSync(filePath, "utf-8"); // Read file content
        return { name: file, content };
      } catch (readErr) {
        console.error("Error reading file:", file, readErr);
        return { name: file, error: "Could not read file" };
      }
    });

    res.json({ files: fileContents });
  });

};
