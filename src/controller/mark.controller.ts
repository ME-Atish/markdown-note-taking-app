import { Request, Response } from "express";
import uploader from "../middlewares/multer";

const uploadFile = uploader.array("file", 12);

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
