import { AbsoluteFill, Sequence, useVideoConfig, Audio, staticFile, interpolate, useCurrentFrame } from "remotion";
import React from "react";
import { Title } from "./Title";
import { Description } from "./Description";

export const MyComp = () => {
    const { fps, durationInFrames, width, height } = useVideoConfig();
    const titles: string[] = ["The Point Men(2022)", "AKA(2023)", "Kill Boksoon(2023)", "The Prison(2017)", "Mrs. Harris Goes to Paris(2022)"]
    const urls: string[] = ["https://an2-img.amz.wtchn.net/image/v2/YW9E31ZR0HVZgppgnnxboA.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXlMM04wYjNKbEwybHRZV2RsTHpFMk56SXlOelkwT0RBMk56RTVOVGc0TkRnaWZRLmZNZVZEQ3dNZlhBZ1Q1U21jLVkxZUh1aU9yQWotNXhwemQzWkdGSFF0d2s",
        "https://an2-img.amz.wtchn.net/image/v2/W5SKzQdgd-lx5ZurhYdoWw.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXlMM04wYjNKbEwybHRZV2RsTHpFMk9EQTJNVFEwTVRjd01qVTFORGt5T1RjaWZRLlFwT1F2M2FXQ3hKTTA2TkstM0d6SmhCTVlrNzh3WWRnVHYyZE1zR19JUEk",
        "https://an2-img.amz.wtchn.net/image/v2/lZnOM6fJ1R36uYMe69VklQ.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXlMM04wYjNKbEwybHRZV2RsTHpFMk56YzRNRFUzTVRjM01qa3hNakEyTlRraWZRLlkyTHFRdXBfT3phbVNqT3cxM1ZBWVIzUi0xWV9BZjhuNV9LTDRUUUktQWs",
        "https://an2-img.amz.wtchn.net/image/v2/xmsLnffoNhW5ZeWn8ndJQg.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXhMM2RsZVdsbE5IWjFkV05wZEhOamQySjBlSE5xSW4wLm9GMzZoa3pWcXRaalRTQW5uRkNIdm5iVldQWWU1OVdrTm1TMkFTOFV6UDQ",
        "https://an2-img.amz.wtchn.net/image/v2/k19ngx3xGpUgKfgYBY5KPA.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXlMM04wYjNKbEwybHRZV2RsTHpFMk5qWXpNamMzTVRVd01qWTRPVGcwTnpjaWZRLkE5SlFRTGE5YU54MFZKbXFZVGtwX0R3UWl6a0lIcXdCZnIyRHFwWFhBV0k"
    ];

    const descriptionElements: React.Component[] = [];
    for (let i = 0; i < 5; i++) {
        descriptionElements.push(
            <Sequence durationInFrames={60} from={i * 60} style={{
            }}>
                <Description place={i + 1} name={titles[i]} img={urls[i]}></Description>
            </Sequence>)
    }

    // const frame = useCurrentFrame();
    // const titleTopMargin = interpolate(frame, [0, 30], [0, 100], { extrapolateRight: "clamp" });
  
    return (
        <AbsoluteFill
            style={{
                backgroundColor: "black",
                zIndex: -2
            }}
        >
            <Audio src={staticFile("/Craven Weight.mp3")} />
            <Sequence durationInFrames={Infinity} from={0} style={{
                position: 'absolute',
                left: '0',
                right: '0',
                margin: `200px auto`,
                height: 'fit-content',
                width: 'fit-content',
                zIndex: 3
            }}>
                <Title />
            </Sequence>
            {descriptionElements}
        </AbsoluteFill>
    );
};