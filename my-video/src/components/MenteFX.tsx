import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  random,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colores, maquina } from "../theme";

// Capa de efectos para "Mente": viñeta morada que respira, scanlines,
// barras de glitch y palabras-susurro que flotan alrededor de Sofía.
export const MenteFX: React.FC<{
  readonly palabras: string[];
  readonly intensidad?: number;
}> = ({ palabras, intensidad = 1 }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  const fade = Math.min(
    interpolate(frame, [0, 0.4 * fps], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
    interpolate(frame, [durationInFrames - 0.4 * fps, durationInFrames], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const respira = 0.75 + 0.25 * Math.sin((frame / fps) * Math.PI * 1.6);
  const paso = Math.floor(frame / 3);
  const glitchOn = random(`g-${paso}`) < 0.22 * intensidad;

  return (
    <AbsoluteFill style={{ pointerEvents: "none", opacity: fade }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 70% 55% at 50% 45%, rgba(0,0,0,0) 35%, ${colores.menteOscuro}cc 78%, #000000f2 100%)`,
          opacity: respira * intensidad,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundColor: colores.mente,
          mixBlendMode: "color",
          opacity: 0.28 * intensidad,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.28) 0px, rgba(0,0,0,0.28) 2px, transparent 2px, transparent 6px)",
          backgroundPositionY: `${(frame * 2) % 6}px`,
          opacity: 0.6,
        }}
      />
      {glitchOn
        ? [0, 1, 2].map((i) => {
            const y = random(`gy-${paso}-${i}`) * height;
            const h = 8 + random(`gh-${paso}-${i}`) * 60;
            const x = (random(`gx-${paso}-${i}`) - 0.5) * 120;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: y,
                  left: 0,
                  width,
                  height: h,
                  translate: `${x}px 0px`,
                  background:
                    i % 2 === 0
                      ? "linear-gradient(90deg, rgba(255,0,90,0.55), rgba(0,229,255,0.55))"
                      : "rgba(168,85,247,0.6)",
                  mixBlendMode: "screen",
                }}
              />
            );
          })
        : null}
      {palabras.map((p, i) => {
        const inicio = (i * durationInFrames) / (palabras.length + 0.5);
        const vida = frame - inicio;
        const duracion = 2.2 * fps;
        const op = interpolate(vida, [0, 0.35 * fps, duracion - 0.5 * fps, duracion], [0, 0.85, 0.85, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const angulo = random(`a-${p}-${i}`) * Math.PI * 2 + vida / (fps * 1.6);
        const radioX = 300 + random(`r-${p}`) * 80;
        const cx = width / 2 + Math.cos(angulo) * radioX;
        const cy = height * 0.42 + Math.sin(angulo) * 330;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: cx,
              top: cy,
              translate: "-50% -50%",
              fontFamily: maquina,
              fontSize: 64,
              color: "#F5F3FF",
              whiteSpace: "nowrap",
              opacity: op * intensidad,
              filter: `blur(${interpolate(vida, [0, 0.4 * fps], [10, 1.2], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              })}px)`,
              scale: String(
                interpolate(vida, [0, duracion], [0.85, 1.25], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              ),
              textShadow: `0 0 26px ${colores.mente}, 3px 0 0 rgba(255,0,90,0.6), -3px 0 0 rgba(0,229,255,0.6)`,
            }}
          >
            {p}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// Pequeño temblor de cámara, determinista.
export const useTemblor = (fuerza: number) => {
  const frame = useCurrentFrame();
  const paso = Math.floor(frame / 2);
  return `${(random(`tx-${paso}`) - 0.5) * fuerza}px ${(random(`ty-${paso}`) - 0.5) * fuerza}px`;
};
