import homeController from "../controllers/homeController.js";
import express from 'express';
let apiRouter = express.Router();

apiRouter.route("/").get(async (req: express.Request, res: express.Response) => {
  await homeController(req, res);
});

export default apiRouter;
