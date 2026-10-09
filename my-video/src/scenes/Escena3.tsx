import { chromaticAberration } from "@remotion/effects/chromatic-aberration";
import { Audio, Video } from "@remotion/media";
import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  Series,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { LuzCalida, Tarjeta } from "../components/Extras";
import { MenteFX, useTemblor } from "../components/MenteFX";
import { Subtitulos } from "../components/Subtitulos";
import { FundidoBordes, TituloEscena } from "../components/TituloEscena";
import { colores } from "../theme";

// Plano largo con la psicóloga: reencuadres suaves hacia quien habla.
const VideoConsulta: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = frame / fps;
  const suave = Easing.bezier(0.45, 0, 0.2, 1);
  return (
    <AbsoluteFill
      style={{
        scale: String(
          interpolate(s, [0, 12, 12.8, 18.6, 19.4, 26.8, 27.4, 31.7], [1.0, 1.08, 1.28, 1.32, 1.1, 1.14, 1.34, 1.4], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: suave,
          }),
        ),
        transformOrigin: `${interpolate(s, [12, 12.8, 18.6, 19.4, 26.8, 27.4], [50, 26, 26, 55, 55, 68], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: suave,
        })}% 40%`,
      }}
    >
      <Video
        name="Clip consulta"
        src={staticFile("clips/s3-psicologa.mp4")}
        premountFor={fps}
        objectFit="cover"
        style={{ width: "100%", height: "100%", filter: "saturate(0.95) contrast(1.05)" }}
      />
    </AbsoluteFill>
  );
};

const VideoDuda: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const temblor = useTemblor(8);
  return (
    <AbsoluteFill style={{ translate: temblor, scale: "1.45", transformOrigin: "68% 40%" }}>
      <Video
        name="Clip Sofía duda"
        src={staticFile("clips/s3-psicologa.mp4")}
        trimBefore={960}
        premountFor={fps}
        objectFit="cover"
        style={{ width: "100%", height: "100%", filter: "saturate(0.6) contrast(1.15)" }}
        effects={[
          chromaticAberration({
            amount: 6 + 10 * Math.abs(Math.sin(frame / 4)),
            angle: (frame * 7) % 360,
          }),
        ]}
      />
    </AbsoluteFill>
  );
};

// ESCENA 3 · "No es cuestión de echarle ganas"
export const Escena3: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <Series>
        <Series.Sequence name="Psicóloga explica" durationInFrames={951} premountFor={fps}>
          <VideoConsulta />
          <Audio name="Voz consulta" src={staticFile("voz/s3-psicologa.wav")} premountFor={fps} />
          <Subtitulos
            lineas={[
              { who: "PSICÓLOGA", text: "Lo que Sofía está viviendo necesita atención profesional.", startMs: 250, endMs: 2950 },
              { who: "PSICÓLOGA", text: "El trastorno bipolar es una condición de salud mental", startMs: 3100, endMs: 5550 },
              { who: "PSICÓLOGA", text: "que puede provocar episodios de manía o hipomanía", startMs: 5600, endMs: 8050 },
              { who: "PSICÓLOGA", text: "y episodios depresivos.", startMs: 8400, endMs: 9600 },
              { who: "PSICÓLOGA", text: "No es simplemente cambiar de humor de un momento a otro.", startMs: 9650, endMs: 11900 },
              { who: "MAMÁ", text: "Yo pensé que exageraba…", startMs: 12600, endMs: 14400 },
              { who: "MAMÁ", text: "le decía que le echara ganas y que controlara lo que sentía.", startMs: 14450, endMs: 18350 },
              { who: "PSICÓLOGA", text: "No es algo que se solucione con fuerza de voluntad.", startMs: 19050, endMs: 21650 },
              { who: "PSICÓLOGA", text: "Con tratamiento y seguimiento profesional,", startMs: 21700, endMs: 23400 },
              { who: "PSICÓLOGA", text: "las personas con trastorno bipolar pueden mejorar y llevar una vida plena.", startMs: 23450, endMs: 26700 },
              { who: "SOFÍA", text: "Yo tampoco entiendo todo lo que me pasa.", startMs: 27400, endMs: 28900 },
              { who: "SOFÍA", text: "Pero necesito que me escuches, no que me hagas sentir culpable.", startMs: 29200, endMs: 31450 },
            ]}
          />
        </Series.Sequence>
        <Series.Sequence name="Mente: ¿y si vuelve a pasar?" durationInFrames={111} premountFor={fps}>
          <VideoDuda />
          <Audio name="Voz Mente vuelve" src={staticFile("voz/s3-mente-vuelve.wav")} premountFor={fps} />
          <Subtitulos lineas={[{ who: "MENTE", text: "¿Y si vuelve a pasar?", startMs: 700, endMs: 3300 }]} />
        </Series.Sequence>
        <Series.Sequence name="No tengo que enfrentarlas sola" trimBefore={24} durationInFrames={114} premountFor={fps}>
          <Video
            name="Clip no sola"
            src={staticFile("clips/s3-no-sola.mp4")}
            premountFor={fps}
            objectFit="cover"
            style={{ width: "100%", height: "100%", filter: "saturate(1.05) contrast(1.05) brightness(1.04)" }}
          />
          <Audio name="Voz no sola" src={staticFile("voz/s3-no-sola.wav")} volume={1.6} premountFor={fps} />
          <Subtitulos
            lineas={[
              { who: "SOFÍA", text: "Puede que tenga dificultades otra vez,", startMs: 950, endMs: 2550 },
              { who: "SOFÍA", text: "pero no tengo que enfrentarlas sola.", startMs: 2600, endMs: 4300 },
            ]}
          />
        </Series.Sequence>
      </Series>

      <Sequence name="Tarjeta bipolar" from={96} durationInFrames={261} premountFor={fps}>
        <Tarjeta
          titulo="TRASTORNO BIPOLAR"
          filas={[
            { texto: "Manía / hipomanía", color: colores.mania, flecha: "arriba", aparece: 75 },
            { texto: "Episodios depresivos", color: colores.depresion, flecha: "abajo", aparece: 155 },
            { texto: "No es “cambiar de humor”", color: "#FFFFFF", flecha: "x", aparece: 195 },
          ]}
        />
      </Sequence>
      <Sequence name="Tarjeta tratamiento" from={573} durationInFrames={228} premountFor={fps}>
        <Tarjeta
          titulo="NO ES FUERZA DE VOLUNTAD"
          filas={[
            { texto: "Tratamiento", color: colores.calma, flecha: "check", aparece: 80 },
            { texto: "Seguimiento profesional", color: colores.calma, flecha: "check", aparece: 110 },
            { texto: "Vida plena", color: colores.esperanza, flecha: "check", aparece: 150 },
          ]}
        />
      </Sequence>

      <Sequence name="Efectos Mente" from={951} durationInFrames={111} premountFor={fps}>
        <MenteFX palabras={["¿Y SI VUELVE?", "OTRA VEZ", "SOLA"]} />
      </Sequence>
      <Sequence name="Luz cálida" from={1062} durationInFrames={114} premountFor={fps}>
        <LuzCalida />
      </Sequence>

      <Sequence name="Rótulo escena 3" from={8} durationInFrames={88} premountFor={fps}>
        <TituloEscena numero={3} titulo="No es cuestión de echarle ganas" color={colores.calma} />
      </Sequence>
      <FundidoBordes entrada={12} salida={12} />

      <Audio name="SFX whoosh" src={staticFile("sfx/whoosh.wav")} from={940} volume={0.55} premountFor={fps} />
      <Audio name="SFX glitch" src={staticFile("sfx/glitch.wav")} from={951} volume={0.35} premountFor={fps} />
      <Audio
        name="SFX drone Mente"
        src={staticFile("sfx/drone.wav")}
        from={948}
        durationInFrames={116}
        volume={(f) =>
          interpolate(f, [0, 12, 100, 116], [0, 0.6, 0.6, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
        premountFor={fps}
      />
      <Audio name="SFX susurro" src={staticFile("sfx/susurro.wav")} from={975} volume={0.25} premountFor={fps} />
    </AbsoluteFill>
  );
};
