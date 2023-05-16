import React, { useState, useEffect } from "react";

function WebsiteViewer() {
  const [htmlContent, setHtmlContent] = useState("");
  const [clicked, setClicked] = useState("");

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

  const handleElementClick = (event) => {
    if (
      event.target.tagName.toLowerCase() === "a" ||
      event.target.tagName.toLowerCase() === "img"
    ) {
      event.preventDefault(); // Prevent default navigation behavior
    }
  
    const element = event.target;
    setClicked(element.childNodes.length)
    if (element.childNodes.textContent) {
      // Leaf node clicked
      const wrapperElement = document.createElement("span");
      wrapperElement.style.backgroundColor = "yellow";
      wrapperElement.textContent = element.textContent;
  
      element.innerHTML = ""; // Remove existing content
      element.appendChild(wrapperElement); // Append the wrapper element
    }
  };
  
  
  
  
  

  const fetchHtmlContent = async (url) => {
    try {
      const response = await fetch(url);
      const html = await response.text();
      setHtmlContent(html);
    } catch (error) {
      console.error("Error fetching HTML:", error);
    }
  };

  return (
    <div>
      <div>
      {clicked}
      </div>
      <input
        type="text"
        placeholder="Enter website URL"
        onChange={(e) => fetchHtmlContent(e.target.value)}
      />
      <div
        id="rootElement"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
}

export default WebsiteViewer;
