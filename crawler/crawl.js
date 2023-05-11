const { JSDOM } = require("jsdom");
const path = require("path");
const fs = require("fs");

exports.crawlInstyle = async (url) => {
  // fetch and parse the html of the currentURL
  console.log(`crawling ${url}`);
  try {
    const resp = await fetch(url);
    if (resp.status > 399) {
      console.log(`Got HTTP error, status code: ${resp.status}`);
      return;
    }
    const contentType = resp.headers.get("content-type");
    if (contentType == null) {
      console.log(`Got Content Type null`);
      return;
    }
    if (!contentType.includes("text/html")) {
      console.log(`Got non-html response: ${contentType}`);
      return;
    }
    const text = await resp.text();
    await getTitles(text);
  } catch (err) {
    console.log(err.message);
  }
};

const getTitles = async (htmlString) => {
  const dom = new JSDOM(htmlString);
  let titles = [];
  let urls = [];
  const items = dom.window.document.querySelectorAll(
    ".comp.mntl-sc-list-item.list-sc-item.mntl-block"
  );
  let i = 0;
  for (const item of items) {
    if (i >= 10) {
      break;
    }

    const headingText = item.querySelector(
      ".mntl-sc-block-heading__text"
    ).textContent;
    titles.push(headingText);
    const url = item.querySelector("img").getAttribute("data-src");
    urls.push(url);

    i++;
  }

  const filePath = path.join(__dirname, "..", "public", "info.json");
  const rawData = fs.readFileSync(filePath);
  const data = JSON.parse(rawData);

  data.titles = titles;
  data.urls = urls;

  const updatedData = JSON.stringify(data, null, 2);
  fs.writeFileSync(filePath, updatedData);
};
