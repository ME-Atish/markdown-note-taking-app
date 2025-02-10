import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/todo";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));