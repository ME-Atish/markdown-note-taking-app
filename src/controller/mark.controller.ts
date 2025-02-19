import { Request, Response } from "express";
import uploader from "../middlewares/multer";
import * as path from "path";
import * as fs from "fs";
import { URLSearchParams } from "url";
import { marked } from "marked"; // Import marked for Markdown rendering

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

export const grammar = async (req: Request, res: Response) => {
  fs.readdir(storageFile, async (err, files) => {
    if (err) {
      return res.status(400).json({ err: "Failed to read directory" });
    }
    try {
      const grammarCheckResults = await Promise.all(
        files.map(async (file) => {
          const filePath = path.join(storageFile, file);
          const content = fs.readFileSync(filePath, "utf-8");
          const response = await fetch(
            "https://api.languagetool.org/v2/check",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: new URLSearchParams({
                text: content,
                language: "en-US",
              }),
            }
          );
          const data = await response.json();
          return { file, correction: data.matches };
        })
      );
      res.json(grammarCheckResults);
    } catch (error) {
      res.status(400).json({ err: "Grammar check failed" });
    }
  });
};

// Retrieve a specific note by filename
export const getNote = async (req: Request, res: Response) => {
  const { filename } = req.params;
  const filePath = path.join(storageFile, filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Note not found" });
  }
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    res.json({ name: filename, content });
  } catch (error) {
    res.status(500).json({ error: "Error reading the note" });
  }
};

// Render Markdown file as HTML
export const renderMarkdown = async (req: Request, res: Response) => {
  const { filename } = req.params;
  const filePath = path.join(storageFile, filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Note not found" });
  }
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const html = marked(content);
    res.send(html); // Sends the rendered HTML
  } catch (error) {
    res.status(500).json({ error: "Error rendering markdown" });
  }
};
