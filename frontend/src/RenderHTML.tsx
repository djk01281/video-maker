import { useEffect, useState } from "react";

function RenderHTML() {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    const url = "https://www.instyle.com/quinta-brunson-abbott-elementary-cover-story-2023-7480422";
    const proxyUrl = "https://cors-anywhere.herokuapp.com/"; // CORS proxy

    fetch(proxyUrl + url)
      .then((response) => response.text())
      .then((html) => {
        setHtmlContent(html);
      })
      .catch((error) => {
        console.error("Error fetching HTML:", error);
      });
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}

export default RenderHTML;
