import { AbsoluteFill, useVideoConfig } from "remotion";
import React from "react";
import "./font.css";

export const Description = (props) => {
    const { fps, durationInFrames, width, height } = useVideoConfig();

    return (
        <div style={{ backgroundColor: 'green', zIndex: 1 }}>
            <img src={props.img} style={{
                zIndex: -1,
                width: '1080px', position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                margin: 'auto',
            }}></img>

            <div style={{
                zIndex: 0,
                position: 'absolute',
                left: 0,
                right: 0,
                top: '200px',
                bottom: 0,
                margin: 'auto',
                width: 'fit-content',
                height: 'fit-content',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}><div style={{ marginBottom: '50px' }}><span style={
                { backgroundColor: '#FADD75', padding: '20px', borderRadius: '20px', color: '#D243BF', fontSize: '70px', fontWeight: '800', fontFamily: 'Sora' }
            }>
                {"#" + props.place + "  "}
            </span>
                </div>
                <div>
                    <span style={
                        { backgroundColor: 'white ', padding: '20px', borderRadius: '20px', color: 'black', fontSize: '60px', fontWeight: '800', fontFamily: 'Sora' }
                    }>
                        {props.name}
                    </span>
                </div>
            </div>


        </div>
    );
};