import * as express from "express";
import { upload, read ,  grammar} from "../controller/mark.controller";
const router = express.Router();

router.post("/" , upload)
router.post("/grammar-check" , grammar)
router.get("/", read);
export default router;
