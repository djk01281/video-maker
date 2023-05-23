import express from "express";
import fetch from "node-fetch";
import cors from "cors";

import path from "path";
const __filename = fileURLToPath(import.meta.url);
import { Url, fileURLToPath } from "url";

import apiRouter from "./routes/apiRouter.js";
import homeRouter from "./routes/homeRouter.js";

const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "..", "..", "frontend", "build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRouter);
app.use("/api", apiRouter);

app.listen(3001);
