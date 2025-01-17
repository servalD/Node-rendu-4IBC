import "reflect-metadata";
import "../di/register";
import express, { Router } from "express";
import dotenv from "dotenv";
import api from "../http/api";
import bodyParser from "body-parser";
import cookiesParser from "cookie-parser";
import errorHandler from "../http/middlewares/ErrorHandler";
import cors from "cors";
dotenv.config();

const app = express();
app.use(
  cookiesParser(),
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json(),
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const mainRouter: Router = express.Router();
app.use("/", mainRouter);
api(mainRouter);
const port = process.env.PORT ?? "3005";

app.use(errorHandler);
app
  .listen(port, () => {
    console.log(`Server is running on port ${port}`);
  })
  .on("error", (err) => {
    throw new Error(err.message);
  });
