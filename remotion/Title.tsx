import {
  AbsoluteFill,
  useVideoConfig,
  useCurrentFrame,
  interpolate,
  spring,
} from "remotion";
import React from "react";
import "./font.css";

export const Title = (props) => {
  const { fps, durationInFrames, width, height } = useVideoConfig();
  const frame = useCurrentFrame();

  const driver = spring({
    frame,
    fps,
  });
  const titleBottmMargin = interpolate(driver, [0, 30], [0, 50], {
    extrapolateRight: "clamp",
  });
  const degrees = [
    2.5, 5, 2.5, 0, -2.5, -5, -2.5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ];
  const titleDegree = interpolate(frame, [0, 600], [0, 600]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          marginBottom: `50px`,
          transform: `rotateZ(${degrees[titleDegree % degrees.length]}deg)`,
        }}
      >
        <span
          style={{
            backgroundColor: "#4440D7",
            padding: "20px",
            borderRadius: "20px",
            color: "#FEE00C",
            fontSize: "80px",
            fontWeight: "800",
            fontFamily: "Sora",
          }}
        >
          {props.heading1}
        </span>
      </div>
      <div>
        <span
          style={{
            backgroundColor: "#FADD75",
            padding: "20px",
            borderRadius: "20px",
            color: "black",
            fontSize: "100px",
            fontWeight: "800",
            fontFamily: "Sora",
          }}
        >
          {props.heading2}
        </span>
      </div>
    </div>
  );
};
