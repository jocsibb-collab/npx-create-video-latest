import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { anton, montserrat } from "../theme";

// Rótulo de escena: "ESCENA 1" + título grande con barra de color.
export const TituloEscena: React.FC<{
  readonly numero: number;
  readonly titulo: string;
  readonly color: string;
}> = ({ numero, titulo, color }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const entra = interpolate(frame, [0, 0.6 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const sale = interpolate(frame, [durationInFrames - 0.4 * fps, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          top: 250,
          left: 70,
          right: 70,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          opacity: sale,
        }}
      >
        <div
          style={{
            fontFamily: montserrat,
            fontWeight: 800,
            fontSize: 30,
            letterSpacing: 10,
            color,
            opacity: entra,
            translate: `${(1 - entra) * -40}px 0px`,
            textShadow: "0 3px 12px rgba(0,0,0,0.7)",
          }}
        >
          ESCENA {numero}
        </div>
        <div
          style={{
            fontFamily: anton,
            fontSize: 104,
            lineHeight: 1.02,
            color: "white",
            textTransform: "uppercase",
            opacity: entra,
            translate: `0px ${(1 - entra) * 40}px`,
            textShadow: "0 8px 30px rgba(0,0,0,0.75)",
          }}
        >
          “{titulo}”
        </div>
        <div
          style={{
            marginTop: 14,
            height: 10,
            width: 260 * entra,
            backgroundColor: color,
            borderRadius: 5,
            boxShadow: `0 0 24px ${color}`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

// Fundido a/desde negro en los bordes de cada escena.
export const FundidoBordes: React.FC<{
  readonly entrada?: number;
  readonly salida?: number;
}> = ({ entrada = 10, salida = 10 }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const op = Math.max(
    entrada > 0
      ? interpolate(frame, [0, entrada], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0,
    salida > 0
      ? interpolate(frame, [durationInFrames - salida, durationInFrames], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0,
  );
  return <AbsoluteFill style={{ backgroundColor: "black", opacity: op, pointerEvents: "none" }} />;
};
