import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  console.log("home");
  res.send("Heollllo");
});

app.get("/api/html/*", async (req, res) => {
  const url = req.params[0];
  const response = await fetch(url);
  const data = await response.text();
  res.send(data);
  console.log(data);
});

app.listen(3001);
