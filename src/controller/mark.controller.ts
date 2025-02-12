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
  fs.readFile(storageFile, "utf-8", (err, date) => {
    if (err) console.log(err);

    console.log(date);
  });
  res.send("ok");
};
