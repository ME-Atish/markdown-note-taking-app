import * as express from "express";
import * as cors from "cors";
import * as dotenv from "dotenv";
import * as multer from "multer";
import * as marked from "marked";
import * as mongoose from "./config/db";
dotenv.config();
mongoose;

const app = express();
const port = process.env.PORT || 3002;
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ massage: "welcome to my markdown note project" });
});

app.listen(port, () => {
  console.log(`server running on http://localhost${port}`);
});
