import * as express from "express";
import { upload, read } from "../controller/mark.controller";
const router = express.Router();

router.post("/" , upload)
router.get("/", read);
export default router;
