import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import RenderHTML from "./RenderHTML";
import Preview from "./Preview";

function App() {
  const [selectedText, setSelectedText] = useState<string[]>([]);
  const handleOnClick = (event: React.MouseEvent) => {
    const clickedElement = event.target as HTMLElement;
    const prevSelected = [...selectedText];

    if (
      clickedElement.tagName.toLowerCase() === "a" ||
      clickedElement.tagName.toLowerCase() === "img"
    ) {
      event.preventDefault(); // Prevent default navigation behavior
    }

    if (hasDirectTextContent(clickedElement)) {
      // Leaf node clicked

      clickedElement.style.backgroundColor = "yellow";
      prevSelected.push(
        typeof clickedElement.innerText === "string"
          ? clickedElement.innerText
          : "empty"
      );
      setSelectedText(prevSelected);
    }
    event.stopPropagation();
  };

  const hasDirectTextContent = (element: HTMLElement) => {
    if (!element.innerText) {
      return false;
    }

    const children = element.childNodes;
    for (let i = 0; i < children.length; i++) {
      if (children[i].nodeType === Node.TEXT_NODE) {
        return true;
      }
    }

    return false;
  };

  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    const alteredArr: string[] = [];
    const clickedButton = event.target as HTMLButtonElement;

    const index = parseInt(clickedButton.id, 10);
    for (let i = 0; i < selectedText.length; i++) {
      if (i !== index) {
        alteredArr.push(selectedText[i]);
      }
    }
    setSelectedText(alteredArr);
  };

  return (
    <div className="App">
      <div>HELLO</div>
      <RenderHTML onClick={handleOnClick}></RenderHTML>
      <Preview selectedText={selectedText} onDelete={handleDelete}></Preview>
    </div>
  );
}

export default App;
