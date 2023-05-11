import {
  AbsoluteFill,
  Sequence,
  useVideoConfig,
  Audio,
  staticFile,
  interpolate,
  useCurrentFrame,
} from "remotion";
import React from "react";
import { Title } from "./Title";
import { Description } from "./Description";

export const MyComp = () => {
  const { fps, durationInFrames, width, height } = useVideoConfig();
  const infoJson = require("../public/info.json");
  const titles: string[] = infoJson.titles;
  const urls: string[] = infoJson.urls;
  const heading1: string = infoJson.heading1;
  const heading2: string = infoJson.heading2;
  const descriptionElements: React.ReactElement[] = [];
  for (let i = 0; i < titles.length; i++) {
    descriptionElements.push(
      <Sequence durationInFrames={60} from={i * 60} style={{}}>
        <Description
          place={i + 1}
          name={titles[i]}
          img={urls[i]}
          type={heading1}
        ></Description>
      </Sequence>
    );
  }

  // const frame = useCurrentFrame();
  // const titleTopMargin = interpolate(frame, [0, 30], [0, 100], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "black",
        zIndex: -2,
      }}
    >
      <Audio src={staticFile("/Craven Weight.mp3")} />
      <Sequence
        durationInFrames={Infinity}
        from={0}
        style={{
          position: "absolute",
          left: "0",
          right: "0",
          margin: `200px auto`,
          height: "fit-content",
          width: "fit-content",
          zIndex: 3,
        }}
      >
        <Title heading1={heading1} heading2={heading2}></Title>
      </Sequence>
      {descriptionElements}
    </AbsoluteFill>
  );
};
