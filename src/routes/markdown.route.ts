import * as express from "express"
import{upload} from "../controller/mark.controller"
const router = express.Router()

router.post("/" ,upload )


export default router