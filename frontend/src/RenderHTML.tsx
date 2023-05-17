import React, { useState, useEffect, lazy } from "react";

function WebsiteViewer() {
  const [htmlContent, setHtmlContent] = useState("");
  const [clicked, setClicked] = useState("");
  const [hasText, setHasText] = useState("");

  useEffect(() => {
    const lazyImages = document.querySelectorAll("img[data-src]");
    lazyImages.forEach((lazyImage) => {
      const dataSrc = lazyImage.getAttribute("data-src");
      if (dataSrc) {
        lazyImage.setAttribute("src", dataSrc);
        lazyImage.removeAttribute("data-src");
      }
    });
  }, [htmlContent]);

  useEffect(() => {
    const rootElement = document.getElementById("rootElement");
    if (rootElement) {
      rootElement.addEventListener("click", handleElementClick);
    }

    return () => {
      if (rootElement) {
        rootElement.removeEventListener("click", handleElementClick);
      }
    };
  }, []);

  const hasDirectTextContent = (element) => {
    if (!element.innerText) {
      return false;
    }

    const children = element.childNodes;
    for (let i = 0; i < children.length; i++) {
      if (
        children[i].nodeType === Node.TEXT_NODE &&
        children[i].textContent.trim() !== ""
      ) {
        return true;
      }
    }

    return false;
  };

  const handleElementClick = (event) => {
    const clickedElement = event.target;
    if (
      clickedElement.tagName.toLowerCase() === "a" ||
      clickedElement.tagName.toLowerCase() === "img"
    ) {
      event.preventDefault(); // Prevent default navigation behavior
    }

    setClicked(clickedElement.childNodes.length);

    if (hasDirectTextContent(clickedElement)) {
      // Leaf node clicked
      setHasText("Has Text");
      // const wrapperElement = document.createElement("span");
      // wrapperElement.style.backgroundColor = "yellow";
      // wrapperElement.textContent = clickedElement.textContent;

      // clickedElement.innerHTML = ""; // Remove existing content
      // clickedElement.appendChild(wrapperElement); // Append the wrapper element
      clickedElement.style.backgroundColor = "yellow";
    } else {
      setHasText("Doesn't have text");
    }
  };

  const fetchHtmlContent = async (url) => {
    try {
      const backendURL = "/api/html/";

      const response = await fetch(backendURL + url);

      const html = await response.text();
      setHtmlContent(html);
      document.addEventListener("click", (event) => {
        const clickedElement = event.target;
        if (clickedElement.tagName.toLowerCase() === "a") {
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
