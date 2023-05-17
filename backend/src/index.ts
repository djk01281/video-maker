import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import { JSDOM } from 'jsdom'
import { Readability } from "@mozilla/readability";


const app = express();
app.use(cors());

app.get("/", (req, res) => {
  console.log("home");
  res.send("Heollllo");
});

app.get("/api/html/*", async (req, res) => {
  try {
    const url = req.params[0];
  const response = await fetch(url);
  const htmlText = await response.text();
  let dom = new JSDOM(htmlText, url);
  const images = dom.window.document.body.querySelectorAll('img');
  images.forEach(image => {
    const dataSrc = image.getAttribute("data-src");
      if (dataSrc) {
        image.setAttribute("src", dataSrc);
        image.removeAttribute("data-src");
      }
  });
  let reader = new Readability(dom.window.document);
  let article = reader.parse().content;
  res.send(article);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
  
  // console.log(data);
});

app.listen(3001);
