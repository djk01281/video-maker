import React, { useState, useEffect, lazy } from "react";

function WebsiteViewer() {
  const [htmlContent, setHtmlContent] = useState("");
  const [hasText, setHasText] = useState("");


  useEffect(() => {
    const rootElement = document.getElementById("rootElement");
    if (rootElement) {
      rootElement.addEventListener("click", (event) => {
        handleElementClick(event);
      });
    }

    return () => {
      if (rootElement) {
        rootElement.removeEventListener("click", (event) => {
          handleElementClick(event);
        });
      }
    };
  }, []);

  const hasDirectTextContent = (element: HTMLElement) => {
    if (!element.innerText) {
      return false;
    }

    const children = element.childNodes;
    for (let i = 0; i < children.length; i++) {
      if (
        children[i].nodeType === Node.TEXT_NODE &&
        children[i].textContent !== ""
      ) {
        return true;
      }
    }

    return false;
  };

  const handleElementClick = (event: MouseEvent) => {
    const clickedElement = event.target as HTMLElement;
    if (
      clickedElement.tagName.toLowerCase() === "a" ||
      clickedElement.tagName.toLowerCase() === "img"
    ) {
      event.preventDefault(); // Prevent default navigation behavior
    }

    if (hasDirectTextContent(clickedElement)) {
      // Leaf node clicked
      setHasText("Has Text");

      clickedElement.style.backgroundColor = "yellow";
    } else {
      setHasText("Doesn't have text");
    }
  };

  const fetchHtmlContent = async (url: string) => {
    try {
      const backendURL = "/api/html/";

      const response = await fetch(backendURL + url);

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
    <div>
      <div>{hasText}</div>
      <input
        type="text"
        placeholder="Enter website URL"
        onChange={(e) => fetchHtmlContent(e.target.value)}
      />
      <div id="rootElement" dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
}

export default WebsiteViewer;
