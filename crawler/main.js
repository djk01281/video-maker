const { crawlInstyle } = require("./crawl.js");

const main = async () => {
  await crawlInstyle(
    "https://www.instyle.com/celebrity/transformations/dolly-partons-changing-looks"
  );
};
main();
