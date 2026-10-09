import { Audio, Video } from "@remotion/media";
import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { anton, colores, montserrat } from "../theme";

const Golpe: React.FC<{
  readonly texto: string;
  readonly color: string;
  readonly tam: number;
}> = ({ texto, color, tam }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = interpolate(frame, [0, 0.3 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });
  return (
    <div
      style={{
        fontFamily: anton,
        fontSize: tam,
        lineHeight: 1.0,
        color,
        textAlign: "center",
        opacity: Math.min(1, p * 1.5),
        scale: String(interpolate(p, [0, 1], [1.8, 1])),
        filter: `blur(${(1 - Math.min(1, p)) * 12}px)`,
        textShadow: `0 0 40px ${color}88, 0 10px 30px rgba(0,0,0,0.8)`,
      }}
    >
      {texto}
    </div>
  );
};

// "TODOS: La salud mental también es salud" + pantalla negra final.
export const Cierre: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fraseFinal = interpolate(frame, [118, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const ayuda = interpolate(frame, [160, 180], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const salidaTotal = interpolate(frame, [228, 243], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <Sequence name="Todos juntos" durationInFrames={108} premountFor={fps}>
        <AbsoluteFill>
          <Video
            name="Fondo los tres"
            src={staticFile("clips/s4-perdon.mp4")}
            trimBefore={60}
            premountFor={fps}
            muted
            objectFit="cover"
            style={{
              width: "100%",
              height: "100%",
              filter: "blur(14px) brightness(0.45) saturate(1.1)",
              scale: "1.1",
            }}
          />
          <AbsoluteFill
            style={{
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
              paddingBottom: 120,
            }}
          >
            <div
              style={{
                fontFamily: montserrat,
                fontWeight: 900,
                fontSize: 34,
                letterSpacing: 10,
                color: "#111",
                backgroundColor: "white",
                padding: "6px 24px",
                borderRadius: 999,
                marginBottom: 24,
              }}
            >
              TODOS
            </div>
            <Sequence name="LA SALUD MENTAL" layout="none">
              <Golpe texto="LA SALUD MENTAL" color="white" tam={128} />
            </Sequence>
            <Sequence name="TAMBIÉN" from={14} layout="none">
              <Golpe texto="TAMBIÉN" color={colores.esperanza} tam={128} />
            </Sequence>
            <Sequence name="ES SALUD" from={28} layout="none">
              <Golpe texto="ES SALUD" color={colores.calma} tam={176} />
            </Sequence>
          </AbsoluteFill>
        </AbsoluteFill>
      </Sequence>

      <Sequence name="Pantalla negra" from={108} premountFor={fps}>
        <AbsoluteFill
          style={{
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
            padding: 90,
            opacity: salidaTotal,
          }}
        >
          <div
            style={{
              fontFamily: montserrat,
              fontWeight: 600,
              fontSize: 76,
              lineHeight: 1.25,
              color: "white",
              textAlign: "center",
              opacity: fraseFinal,
              translate: `0px ${(1 - fraseFinal) * 30}px`,
            }}
          >
            “Comprender es el primer paso para{" "}
            <span style={{ color: colores.esperanza, fontWeight: 800 }}>acompañar</span>”
          </div>
          <div
            style={{
              marginTop: 60,
              fontFamily: montserrat,
              fontWeight: 600,
              fontSize: 34,
              lineHeight: 1.4,
              color: "rgba(255,255,255,0.7)",
              textAlign: "center",
              opacity: ayuda,
            }}
          >
            Si te sientes identificado/a, habla con alguien de confianza
            <br />y busca apoyo profesional.
          </div>
        </AbsoluteFill>
      </Sequence>

      <Audio name="SFX impacto" src={staticFile("sfx/impacto.wav")} volume={0.7} premountFor={fps} />
      <Audio name="SFX impacto 2" src={staticFile("sfx/impacto.wav")} from={28} volume={0.45} premountFor={fps} />
    </AbsoluteFill>
  );
};
