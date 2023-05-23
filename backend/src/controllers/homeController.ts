import path from "path";
import { fileURLToPath } from "url";
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const homeController = async (req: express.Request, res: express.Response) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "..", "frontend", "build", "index.html")
  );
};

export default homeController;

