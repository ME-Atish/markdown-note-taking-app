import * as express from "express";
import {
  upload,
  read,
  grammar,
  getNote,
  renderMarkdown,
} from "../controller/mark.controller";
const router = express.Router();

router.post("/", upload);
router.post("/grammar-check", grammar);
router.get("/", read);
router.get("/note/:filename", getNote);
router.get("/render/:filename", renderMarkdown);
export default router;
