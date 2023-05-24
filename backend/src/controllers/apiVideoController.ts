import express from "express";

const apiVideoController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const data = req.body;
    console.log(data.titles);
    res.send(`titles: ${data.titles}`);
  } catch (error) {
    res.send(error);
  }
};

export default apiVideoController;
