import express from "express";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";
import puppeteer from "puppeteer";

const apiHtmlController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const browser: puppeteer.Browser = await puppeteer.launch(); // for test disable the headlels mode,
    const page: puppeteer.Page = await browser.newPage();
    const url: string = typeof req.params.url === "string" ? req.params.url : "";
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
          }, 10);
        });
      });
    }

    await page.goto(url);

    await page.setViewport({
      width: 1200,
      height: 800,
    });

    await autoScroll(page);

    const htmlText = await page.content();
    await browser.close();

    let dom = new JSDOM(htmlText);
    const images = dom.window.document.body.querySelectorAll("img");
    images.forEach((image) => {
      const classArray: string[] = [...image.classList];
      classArray.forEach((className) => {
        if (className.includes("lazy")) {
          image.classList.remove(className);
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
      if (noscript.parentNode !== null) {
        noscript.parentNode.removeChild(noscript);
      }
    });

    let reader = new Readability(dom.window.document);
    let article;
    if (reader != null) {
      article = reader.parse();
      if (article !== null) {
        article = article.content;
      }
      res.send(article);
    }
  } catch (error) {
    console.log(error);
  }
};

export default apiHtmlController;
