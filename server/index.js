import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/dbConnect.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send({ message: "hello world!" });
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port: http://localhost:${PORT}`);
});
