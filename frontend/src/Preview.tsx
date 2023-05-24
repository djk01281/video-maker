import React, { useState, useEffect, lazy } from "react";

const Preview: React.FC<{ selectedText: string[] }> = (props) => {
  const [htmlContent, setHtmlContent] = useState("");
  const [hasText, setHasText] = useState("");

  const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    const backendURL = "/api/video";
    const response = await fetch(backendURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titles: [...props.selectedText],
      }),
    });
  };
  return (
    <div className="Preview">
      <div className="button-container">
        <button onClick={handleButtonClick}>GENERATE</button>
      </div>
      <div className="selected-container">
        {props.selectedText.map((text) => (
          <div>{text}</div>
        ))}
      </div>
    </div>
  );
};

export default Preview;
