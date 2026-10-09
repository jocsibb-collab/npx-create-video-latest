import { Audio } from "@remotion/media";
import React from "react";
import { AbsoluteFill, interpolate, Series, staticFile, useVideoConfig } from "remotion";
import { Cierre } from "./scenes/Cierre";
import { Escena1 } from "./scenes/Escena1";
import { Escena2 } from "./scenes/Escena2";
import { Escena3 } from "./scenes/Escena3";
import { Escena4 } from "./scenes/Escena4";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// TikTok vertical 1080x1920 · guion "Sigo siendo yo"
export const SigoSiendoYo: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <Series>
        <Series.Sequence name="Escena 1 · Puedo con todo" durationInFrames={603} premountFor={fps}>
          <Escena1 />
        </Series.Sequence>
        <Series.Sequence name="Escena 2 · No puedo levantarme" durationInFrames={957} premountFor={fps}>
          <Escena2 />
        </Series.Sequence>
        <Series.Sequence name="Escena 3 · No es cuestión de echarle ganas" durationInFrames={1176} premountFor={fps}>
          <Escena3 />
        </Series.Sequence>
        <Series.Sequence name="Escena 4 · Sigo siendo yo" durationInFrames={645} premountFor={fps}>
          <Escena4 />
        </Series.Sequence>
        <Series.Sequence name="Cierre" durationInFrames={243} premountFor={fps}>
          <Cierre />
        </Series.Sequence>
      </Series>

      {/* Música de fondo (bajita, por debajo de las voces) */}
      <Audio
        name="Música manía"
        src={staticFile("musica/mania.wav")}
        durationInFrames={603}
        volume={(f) => interpolate(f, [0, 340, 360, 520, 540, 588, 603], [0.14, 0.14, 0.06, 0.06, 0.12, 0.12, 0], clamp)}
        premountFor={fps}
      />
      <Audio
        name="Música oscura"
        src={staticFile("musica/oscura.wav")}
        from={595}
        durationInFrames={965}
        volume={(f) => interpolate(f, [0, 25, 940, 965], [0, 0.17, 0.17, 0], clamp)}
        premountFor={fps}
      />
      <Audio
        name="Música calma"
        src={staticFile("musica/calma.wav")}
        from={1560}
        durationInFrames={1176}
        volume={(f) =>
          interpolate(f, [0, 30, 935, 951, 1062, 1080, 1150, 1176], [0, 0.12, 0.12, 0.03, 0.03, 0.12, 0.12, 0], clamp)
        }
        premountFor={fps}
      />
      <Audio
        name="Música esperanza"
        src={staticFile("musica/esperanza.wav")}
        from={2736}
        durationInFrames={888}
        volume={(f) => interpolate(f, [0, 30, 600, 645, 830, 888], [0, 0.12, 0.14, 0.42, 0.42, 0], clamp)}
        premountFor={fps}
      />
    </AbsoluteFill>
  );
};
