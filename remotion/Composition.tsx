import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import React from "react";
import { Title } from "./Title";
import { Description } from "./Description";

export const MyComposition = () => {
    const { fps, durationInFrames, width, height } = useVideoConfig();
    const urls: string[] = ["https://an2-img.amz.wtchn.net/image/v2/YW9E31ZR0HVZgppgnnxboA.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXlMM04wYjNKbEwybHRZV2RsTHpFMk56SXlOelkwT0RBMk56RTVOVGc0TkRnaWZRLmZNZVZEQ3dNZlhBZ1Q1U21jLVkxZUh1aU9yQWotNXhwemQzWkdGSFF0d2s"
    ];
    return (
        <AbsoluteFill
            style={{
                backgroundColor: "black",
                zIndex: -2
            }}
        >
            <Sequence durationInFrames={Infinity} from={0} style={{
                position: 'absolute',
                left: '0',
                right: '0',
                margin: '100px auto',
                height: 'fit-content',
                width: 'fit-content',
                zIndex: 3
            }}>
                <Title />
            </Sequence>
            <Sequence durationInFrames={60} from={0} style={{

            }}>
                <Description place='1' name='The Point Men(2022)' img={urls[0]}></Description>
            </Sequence>

        </AbsoluteFill>
    );
};