import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";
import puppeteer from "puppeteer";
import { isGeneratorFunction } from "util/types";

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  console.log("home");
  res.send("Heollllo");
});

app.get("/api/html/*", async (req, res) => {
  try {
    // const url = req.params[0];
    // const response = await fetch(url);

    // let images = dom.window.document.body.querySelectorAll("img");
    // images.forEach((image) => {
    //   const src = image.getAttribute("src");
    //   const dataSrc = image.getAttribute("data-src");
    //   if (src == null) {
    //     image.setAttribute("src", dataSrc);
    //   }

    //   const noscriptElement = image.nextSibling;
    //   image.parentNode.removeChild(noscriptElement);
    // });

    // const noscripts = dom.window.document.body.querySelectorAll("noscript");
    // noscripts.forEach((noscript) => {
    //   const innerText = noscript.innerHTML;
    //   console.log(innerText);
    //   if (innerText != null) {
    //     let imgDom = new JSDOM(innerText);
    //     let imgElement = imgDom.window.document.querySelector("img");
    //     if (imgElement != null) {
    //       console.log("is Image");
    //       noscript.parentNode.appendChild(imgElement);
    //     }
    //   }
    // });
    // images = dom.window.document.body.querySelectorAll("img");
    // images.forEach((image) => {
    //   const src = image.getAttribute("src");
    //   const dataSrc = image.getAttribute("data-src");
    //   console.log(`src = ${src}`);
    //   console.log(`data-src = ${dataSrc}`);
    //   console.log(" ");
    // });

    const browser = await puppeteer.launch(); // for test disable the headlels mode,
    const page = await browser.newPage();
    const url = "https://www.instyle.com/best-places-to-buy-shoes-7499811";

    async function autoScroll(page: puppeteer.Page): Promise<void> {
      await page.evaluate(async () => {
        await new Promise<void>((resolve) => {
          let totalHeight = 0;
          const distance = 100;
          const timer = setInterval(() => {
            const scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;

            if (totalHeight >= scrollHeight - window.innerHeight) {
              clearInterval(timer);
              resolve();
            }
          }, 100);
        });
      });
    }

    await page.goto(url);
    // Wait for 5 seconds
    // console.log(await page.content());

    // await page.waitForSelector("img", { timeout: 5000 });
    // const a = 1;
    // await page.evaluate(() => {
    //   const images = document.querySelectorAll("img");
    //   images.forEach((image) => {
    //     if (image.hasAttribute("data-src")) {
    //       const dataSrc = image["data-src"];
    //       image.setAttribute("src", dataSrc);
    //       console.log(`Changed to ${dataSrc}`);
    //     }
    //   });
    // });
    await page.setViewport({
      width: 1200,
      height: 800,
    });

    await autoScroll(page);

    // const bodyHandle = await page.$("body");
    // await page.evaluate((body) => {
    //   const images = body.querySelectorAll("img");
    //   images.forEach((image) => {
    //     console.log("img found");
    //     if (image.classList.contains("lazy")) {
    //       image.classList.remove("lazy");
    //       console.log("removed lazy");
    //     }
    //   });
    // }, bodyHandle);
    // await bodyHandle.dispose();

    const htmlText = await page.content();
    await browser.close();

    let dom = new JSDOM(htmlText, url);
    const images = dom.window.document.body.querySelectorAll("img");
    images.forEach((image) => {
      console.log("img found");
      const classArray: string[] = [...image.classList];
      classArray.forEach((className) => {
        if (className.includes("lazy")) {
          image.classList.remove(className);
          console.log("removed lazy");
        }
      });

      if (image.hasAttribute("data-src")) {
        image.removeAttribute("data-src");
      }
      if (image.hasAttribute("data-srcset")) {
        image.removeAttribute("data-srcset");
      }
      if (image.hasAttribute("srcset")) {
        image.removeAttribute("srcset");
      }
    });

    //remove noscript tags
    const noscripts = dom.window.document.body.querySelectorAll("noscript");
    noscripts.forEach((noscript) => {
      console.log("noscript found");
      noscript.parentNode.removeChild(noscript);
      console.log("noscript deleted");
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
