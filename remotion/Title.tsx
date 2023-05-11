import { AbsoluteFill, useVideoConfig } from "remotion";
import React from "react";
import "./font.css";

export const Title = () => {
  const { fps, durationInFrames, width, height } = useVideoConfig();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <div style={{ marginBottom: '50px' }}>
        <span style={
          { backgroundColor: '#4440D7', padding: '20px', borderRadius: '20px', color: '#FEE00C', fontSize: '100px', fontWeight: '800', fontFamily: 'Sora' }
        }>
          TOP 5
        </span>
      </div>
      <div>
        <span style={
          { backgroundColor: '#FADD75', padding: '20px', borderRadius: '20px', color: 'black', fontSize: '40px', fontWeight: '800', fontFamily: 'Sora' }
        }>
          MOST WATCHED SHOWS IN NETFLIX KOREA
        </span>
      </div>
    </div>
  );
};