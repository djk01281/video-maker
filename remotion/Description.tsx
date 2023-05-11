import {
  AbsoluteFill,
  FolderContext,
  useVideoConfig,
  useCurrentFrame,
  interpolate,
  spring,
  Easing,
  random,
} from "remotion";
import React from "react";
import { useMemo, useRef, useEffect } from "react";
import "./font.css";

const coors = [-1, 0, 1];
let randomX = -50;
let randomY = -50;
const randomNumberInRange = (max) => {
  return Math.floor(Math.random() * max);
};

export const Description = (props) => {
  const { fps, durationInFrames, width, height } = useVideoConfig();
  const frame = useCurrentFrame();
  const driver = spring({
    frame,
    fps,
  });
  const descriptionTopMargin = interpolate(driver, [0, 1], [400, 200]);
  const descriptionOpacity = interpolate(driver, [0, 1], [0, 1]);
  const imageOpacity = interpolate(frame, [0, 45], [0.2, 1], {
    easing: Easing.bezier(0.35, 0.89, 0.22, 1),
  });
  useEffect(() => {
    randomX = -50 + coors[randomNumberInRange(3)];
    randomY = -50 + coors[randomNumberInRange(3)];
  }, []);

  const imageTransformTop = interpolate(frame, [0, 60], [-50, randomY]);
  const imageTransformLeft = interpolate(frame, [0, 60], [-50, randomX]);

  return (
    <div style={{ backgroundColor: "green", zIndex: 1 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={props.img}
          style={{
            zIndex: -1,
            height: "2000px",
            position: "absolute",
            left: "50%",
            // right: 0,
            top: "50%",
            // bottom: 0,
            margin: "auto",
            transform: `translate(${imageTransformTop}%, ${imageTransformLeft}%)`,
            opacity: `${imageOpacity}`,
          }}
        ></img>
      </div>

      <div
        style={{
          zIndex: 0,
          position: "absolute",
          left: 0,
          right: 0,
          top: `${descriptionTopMargin}px`,
          opacity: `${descriptionOpacity}`,
          bottom: 0,
          margin: "auto",
          width: "fit-content",
          height: "fit-content",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ marginBottom: "50px" }}>
          <span
            style={{
              backgroundColor: "#FADD75",
              padding: "20px",
              borderRadius: "20px",
              color: "#D243BF",
              fontSize: "70px",
              fontWeight: "800",
              fontFamily: "Sora",
            }}
          >
            {"#" + props.place + "  "}
          </span>
        </div>
        <div>
          <span
            style={{
              backgroundColor: "white ",
              padding: "20px",
              borderRadius: "20px",
              color: "black",
              fontSize: "60px",
              fontWeight: "800",
              fontFamily: "Sora",
            }}
          >
            {props.name}
          </span>
        </div>
      </div>
    </div>
  );
};
