import { chromaticAberration } from "@remotion/effects/chromatic-aberration";
import { Audio, Video } from "@remotion/media";
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  Series,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { MenteFX, useTemblor } from "../components/MenteFX";
import { Subtitulos } from "../components/Subtitulos";
import { FundidoBordes, TituloEscena } from "../components/TituloEscena";
import { colores } from "../theme";

const gradoTriste = "saturate(0.42) contrast(1.08) brightness(0.9) hue-rotate(-8deg)";

// El clip donde habla Mente: aberración cromática y temblor mientras habla (1.5 s – 5.2 s del original).
const VideoSueloMente: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const segundos = frame / fps;
  const mente = interpolate(segundos, [1.4, 1.7, 5.0, 5.4], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const temblor = useTemblor(12 * mente);
  return (
    <AbsoluteFill style={{ translate: temblor, scale: String(1 + 0.06 * mente) }}>
      <Video
        name="Clip Mente rodeándola"
        src={staticFile("clips/s2-mente.mp4")}
        premountFor={fps}
        objectFit="cover"
        style={{ width: "100%", height: "100%", filter: gradoTriste }}
        effects={[
          chromaticAberration({
            amount: mente * (8 + 12 * Math.abs(Math.sin(frame / 3))),
            angle: (frame * 9) % 360,
            disabled: mente === 0,
          }),
        ]}
      />
    </AbsoluteFill>
  );
};

// ESCENA 2 · "No puedo levantarme" (depresión)
export const Escena2: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <Series>
        <Series.Sequence name="Sofía en el suelo" trimBefore={18} durationInFrames={474} premountFor={fps}>
          <Video
            name="Clip suelo"
            src={staticFile("clips/s2-suelo.mp4")}
            premountFor={fps}
            objectFit="cover"
            style={{ width: "100%", height: "100%", filter: gradoTriste }}
          />
          <Audio name="Voz suelo" src={staticFile("voz/s2-suelo.wav")} premountFor={fps} />
          <Subtitulos
            lineas={[
              { who: "MAMÁ", text: "Sofía, llevas días encerrada.", startMs: 1100, endMs: 3200 },
              { who: "MAMÁ", text: "No has querido hablar conmigo.", startMs: 3300, endMs: 4700 },
              { who: "MAMÁ", text: "¿Qué te pasa?", startMs: 4800, endMs: 6100 },
              { who: "SOFÍA", text: "No sé… no tengo fuerzas para nada.", startMs: 6600, endMs: 8700 },
              { who: "SOFÍA", text: "Ni siquiera puedo levantarme.", startMs: 8750, endMs: 10300 },
              { who: "SOFÍA", text: "Siento que todo lo que hago está mal.", startMs: 10400, endMs: 12000 },
              { who: "SOFÍA", text: "Ayer creía que podía lograr cualquier cosa…", startMs: 12100, endMs: 14100 },
              { who: "SOFÍA", text: "y hoy ni siquiera puedo conmigo misma.", startMs: 14200, endMs: 15800 },
            ]}
          />
        </Series.Sequence>
        <Series.Sequence name="Mente la rodea" trimBefore={42} durationInFrames={483} premountFor={fps}>
          <VideoSueloMente />
          <Audio name="Voz Mente + Sofía + mamá" src={staticFile("voz/s2-mente.wav")} premountFor={fps} />
          <Subtitulos
            lineas={[
              { who: "MENTE", text: "Eres un fracaso.", startMs: 1600, endMs: 2800 },
              { who: "MENTE", text: "Nadie te entiende.", startMs: 2850, endMs: 3850 },
              { who: "MENTE", text: "¿Para qué intentarlo?", startMs: 3900, endMs: 5150 },
              { who: "SOFÍA", text: "¡Ya basta! ¡No quiero sentirme así!", startMs: 5250, endMs: 7300 },
              { who: "MAMÁ", text: "¡Pero si ayer estabas feliz!", startMs: 8150, endMs: 9900 },
              { who: "MAMÁ", text: "¿Por qué no puedes simplemente controlar tus emociones?", startMs: 9950, endMs: 12300 },
              { who: "SOFÍA", text: "¡¿Tú crees que yo quiero sentirme así?!", startMs: 13200, endMs: 15200 },
            ]}
          />
        </Series.Sequence>
      </Series>

      <Sequence name="Efectos Mente" from={474} durationInFrames={128} premountFor={fps}>
        <MenteFX palabras={["FRACASO", "NADIE TE ENTIENDE", "¿PARA QUÉ?", "LO ARRUINAS TODO"]} />
      </Sequence>

      <Sequence name="Rótulo escena 2" from={8} durationInFrames={84} premountFor={fps}>
        <TituloEscena numero={2} titulo="No puedo levantarme" color={colores.depresion} />
      </Sequence>
      <FundidoBordes entrada={12} salida={14} />

      <Audio name="SFX latido inicio" src={staticFile("sfx/latido.wav")} volume={0.5} premountFor={fps} />
      <Audio name="SFX whoosh" src={staticFile("sfx/whoosh.wav")} from={462} volume={0.55} premountFor={fps} />
      <Audio name="SFX glitch" src={staticFile("sfx/glitch.wav")} from={474} volume={0.35} premountFor={fps} />
      <Audio
        name="SFX drone Mente"
        src={staticFile("sfx/drone.wav")}
        from={470}
        durationInFrames={135}
        volume={(f) =>
          interpolate(f, [0, 15, 115, 135], [0, 0.6, 0.6, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
        premountFor={fps}
      />
      <Audio name="SFX latido silencio" src={staticFile("sfx/latido.wav")} from={891} volume={0.85} premountFor={fps} />
    </AbsoluteFill>
  );
};
