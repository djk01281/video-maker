import React, { useState, useEffect, lazy } from "react";

const RenderHTML: React.FC<{ onClick: React.MouseEventHandler }> = (props) => {
  const [htmlContent, setHtmlContent] = useState("");
  const [hasText, setHasText] = useState("");




  const fetchHtmlContent = async (url: string) => {
    try {
      const backendURL = "/api/html/";
      const encodedURL = encodeURIComponent(url);
      const response = await fetch(backendURL + encodedURL);

      const html = await response.text();
      setHtmlContent(html);

      document.addEventListener("click", (event: MouseEvent) => {
        const clickedElement = event.target as HTMLElement;
        if (clickedElement && clickedElement.tagName.toLowerCase() === "a") {
          event.preventDefault(); // Prevent default navigation behavior for all <a> tags
        }
      });
    } catch (error) {
      console.error("Error fetching HTML:", error);
    }
  };

  return (
    <div className="RenderHTML">
      <div>{hasText}</div>
      <input
        type="text"
        placeholder="Enter website URL"
        onChange={(e) => fetchHtmlContent(e.target.value)}
      />
      <div
        id="rootElement"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        onClick={props.onClick}
      />
    </div>
  );
};

export default RenderHTML;
