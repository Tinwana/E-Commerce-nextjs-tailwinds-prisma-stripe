import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDb } from "./config/dbConfig.js.js";
import { route } from "./routes/index.js";
dotenv.config({});
const app = express();
app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);
app.use(express.json(), express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    status: "error",
    message: message,
    statusCode,
  });
});
app.use("/api/health", (req, res, next) => {
  return res.status(200).json({
    health: "OK",
  });
});
const port = process.env.PORT || 8001;
connectDb();
route(app);

app.listen(port, () => {
  console.log("server listening on " + port);
});
