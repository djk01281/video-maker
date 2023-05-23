import express from "express";

const apiVideoController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const data = req.body;
    res.send(`titles: ${data.titles}, urls: ${data.urls}`);
  } catch (error) {
    res.send(error);
  }
};

export default apiVideoController;
