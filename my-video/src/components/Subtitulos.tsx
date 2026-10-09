import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  random,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colorPersonaje, maquina, montserrat, type Personaje } from "../theme";

export type Linea = {
  readonly who: Personaje;
  readonly text: string;
  readonly startMs: number;
  readonly endMs: number;
};

// Subtítulos estilo TikTok: palabra por palabra, con etiqueta del personaje.
// Los tiempos son relativos al archivo original del clip (el Sequence padre aplica el trim).
export const Subtitulos: React.FC<{
  readonly lineas: Linea[];
  readonly top?: number;
}> = ({ lineas, top = 1230 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ms = (frame / fps) * 1000;

  const linea = lineas.find((l) => ms >= l.startMs && ms < l.endMs + 200);
  if (!linea) {
    return null;
  }

  const esMente = linea.who === "MENTE";
  const color = colorPersonaje[linea.who];
  const palabras = linea.text.split(" ");
  const dur = Math.max(300, (linea.endMs - linea.startMs) * 0.85);
  const local = ms - linea.startMs;

  const entrada = interpolate(local, [0, 180], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const salida = interpolate(ms, [linea.endMs, linea.endMs + 200], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const jitterX = esMente ? (random(`jx-${Math.floor(frame / 2)}`) - 0.5) * 8 : 0;
  const jitterY = esMente ? (random(`jy-${Math.floor(frame / 2)}`) - 0.5) * 6 : 0;

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          top,
          left: 70,
          width: 840,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 18,
          opacity: entrada * salida,
          translate: `${jitterX}px ${(1 - entrada) * 30 + jitterY}px`,
        }}
      >
        <div
          style={{
            fontFamily: montserrat,
            fontWeight: 900,
            fontSize: 30,
            letterSpacing: 6,
            color: esMente ? "#fff" : "#111",
            backgroundColor: color,
            padding: "6px 22px",
            borderRadius: 999,
            boxShadow: esMente ? `0 0 30px ${color}` : "0 6px 20px rgba(0,0,0,0.4)",
          }}
        >
          {linea.who}
        </div>
        <div
          style={{
            fontFamily: esMente ? maquina : montserrat,
            fontWeight: esMente ? 400 : 800,
            fontSize: esMente ? 70 : 64,
            lineHeight: 1.18,
            textAlign: "center",
            color: "white",
            textTransform: esMente ? "uppercase" : "none",
            letterSpacing: esMente ? 2 : 0,
          }}
        >
          {palabras.map((p, i) => {
            const inicio = (i / palabras.length) * dur;
            const aparece = interpolate(local, [inicio - 60, inicio + 90], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.34, 1.56, 0.64, 1),
            });
            const siguiente = ((i + 1) / palabras.length) * dur;
            const activa = local >= inicio && local < siguiente;
            return (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  marginRight: "0.3em",
                  opacity: aparece,
                  scale: String(0.7 + 0.3 * aparece + (activa && !esMente ? 0.06 : 0)),
                  color: activa ? color : esMente ? "#EDE9FE" : "white",
                  WebkitTextStroke: esMente ? "0px" : "10px rgba(0,0,0,0.85)",
                  paintOrder: "stroke fill",
                  textShadow: esMente
                    ? `4px 0 0 rgba(255,0,90,0.75), -4px 0 0 rgba(0,229,255,0.75), 0 0 28px ${color}`
                    : "0 6px 18px rgba(0,0,0,0.55)",
                }}
              >
                {p}
              </span>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
