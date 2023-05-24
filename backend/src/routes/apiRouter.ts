import express from "express";
let apiRouter = express.Router();
import apiHtmlController from "../controllers/apiHtmlController.js";
import apiVideoController from "../controllers/apiVideoController.js";

apiRouter.get("/html", async (req: express.Request, res: express.Response) => {
  console.log("/html");
  res.send("good");
});

apiRouter.get(
  "/html/:url",
  async (req: express.Request, res: express.Response) => {
    console.log("/html");
    await apiHtmlController(req, res);
  }
);

apiRouter.post(
  "/video",
  async (req: express.Request, res: express.Response) => {
    console.log("/video");
    await apiVideoController(req, res);
  }
);

export default apiRouter;
