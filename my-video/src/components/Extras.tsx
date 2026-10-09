import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { anton, colores, marker, montserrat } from "../theme";

// Título de apertura del TikTok.
export const TituloPrincipal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const entra = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });
  const sale = interpolate(frame, [durationInFrames - 0.35 * fps, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ pointerEvents: "none", opacity: sale }}>
      <AbsoluteFill
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 45%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 250,
          left: 0,
          right: 0,
          textAlign: "center",
          scale: String(0.6 + 0.4 * entra),
          opacity: entra,
        }}
      >
        <div
          style={{
            fontFamily: anton,
            fontSize: 150,
            lineHeight: 1,
            color: "white",
            textShadow: `0 0 40px ${colores.mente}, 0 10px 30px rgba(0,0,0,0.8)`,
          }}
        >
          SIGO SIENDO YO
        </div>
        <div
          style={{
            marginTop: 18,
            fontFamily: montserrat,
            fontWeight: 800,
            fontSize: 40,
            color: colores.mania,
            letterSpacing: 2,
            textShadow: "0 4px 14px rgba(0,0,0,0.9)",
          }}
        >
          Una historia sobre el trastorno bipolar
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Garabato tipo libreta que aparece de golpe (energía de la manía).
export const Garabato: React.FC<{
  readonly texto: string;
  readonly x: number;
  readonly y: number;
  readonly rotacion: number;
  readonly color?: string;
}> = ({ texto, x, y, rotacion, color = colores.mania }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const pop = interpolate(frame, [0, 0.25 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.8, 0.64, 1),
  });
  const sale = interpolate(frame, [durationInFrames - 0.25 * fps, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const vibra = Math.sin(frame * 1.7) * 1.5;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        translate: "-50% -50%",
        rotate: `${rotacion + vibra}deg`,
        scale: String(pop),
        opacity: sale,
        fontFamily: marker,
        fontSize: 76,
        color,
        whiteSpace: "nowrap",
        textShadow: "0 0 18px rgba(250,204,21,0.6), 4px 4px 0 rgba(0,0,0,0.85)",
      }}
    >
      {texto}
    </div>
  );
};

// Tarjeta informativa (escena de la psicóloga).
export const Tarjeta: React.FC<{
  readonly titulo: string;
  readonly filas: { texto: string; color: string; flecha: "arriba" | "abajo" | "check" | "x"; aparece: number }[];
}> = ({ titulo, filas }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const entra = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const sale = interpolate(frame, [durationInFrames - 0.4 * fps, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        top: 210,
        left: 70,
        width: 720,
        padding: "30px 36px",
        borderRadius: 32,
        backgroundColor: "rgba(10,10,20,0.72)",
        border: `3px solid ${colores.calma}`,
        boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        opacity: entra * sale,
        translate: `${(1 - entra) * -60}px 0px`,
      }}
    >
      <div
        style={{
          fontFamily: anton,
          fontSize: 58,
          color: "white",
          letterSpacing: 1,
          marginBottom: 14,
        }}
      >
        {titulo}
      </div>
      {filas.map((f) => {
        const op = interpolate(frame, [f.aparece, f.aparece + 0.35 * fps], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        });
        return (
          <div
            key={f.texto}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginTop: 14,
              opacity: op,
              translate: `${(1 - op) * 30}px 0px`,
            }}
          >
            <Icono tipo={f.flecha} color={f.color} />
            <div
              style={{
                fontFamily: montserrat,
                fontWeight: 800,
                fontSize: 44,
                color: f.color,
              }}
            >
              {f.texto}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Icono: React.FC<{ readonly tipo: "arriba" | "abajo" | "check" | "x"; readonly color: string }> = ({
  tipo,
  color,
}) => {
  const d =
    tipo === "arriba"
      ? "M24 6 L42 34 L6 34 Z"
      : tipo === "abajo"
        ? "M6 12 L42 12 L24 40 Z"
        : tipo === "check"
          ? "M8 25 L19 36 L40 12"
          : "M10 10 L38 38 M38 10 L10 38";
  const relleno = tipo === "arriba" || tipo === "abajo";
  return (
    <svg width={48} height={48} viewBox="0 0 48 48">
      <path
        d={d}
        fill={relleno ? color : "none"}
        stroke={color}
        strokeWidth={relleno ? 0 : 7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// Destello de luz cálida (esperanza).
export const LuzCalida: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const op = interpolate(
    frame,
    [0, 0.8 * fps, durationInFrames - 0.8 * fps, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const x = interpolate(frame, [0, durationInFrames], [-10, 30]);
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        opacity: op * 0.55,
        mixBlendMode: "screen",
        background: `radial-gradient(circle at ${x}% 12%, rgba(255,190,110,0.85) 0%, rgba(255,140,60,0.35) 28%, rgba(0,0,0,0) 60%)`,
      }}
    />
  );
};

// Flash de transición con glitch.
export const FlashGlitch: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const op = interpolate(frame, [0, durationInFrames * 0.6, durationInFrames], [0, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const blanco = frame >= durationInFrames - 4;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <AbsoluteFill
        style={{
          backgroundColor: blanco ? "white" : colores.mente,
          mixBlendMode: blanco ? "normal" : "screen",
          opacity: blanco ? 1 : op * 0.5,
        }}
      />
    </AbsoluteFill>
  );
};
