import * as express from "express";
import * as cors from "cors";
import * as dotenv from "dotenv";
import * as marked from "marked";
import * as fs from "fs";
import markRouter from "./routes/markdown.route"
import * as mongoose from "./config/db";
dotenv.config();
mongoose;

const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ massage: "welcome to my markdown note project" });
});

app.use("/mark" , markRouter)

app.listen(port, () => {
  console.log(`server running on http://localhost${port}`);
});
