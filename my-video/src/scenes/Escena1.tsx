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
import { FlashGlitch, Garabato, TituloPrincipal } from "../components/Extras";
import { MenteFX, useTemblor } from "../components/MenteFX";
import { Subtitulos } from "../components/Subtitulos";
import { TituloEscena } from "../components/TituloEscena";
import { colores } from "../theme";

const VideoMente: React.FC<{ readonly src: string }> = ({ src }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const temblor = useTemblor(10);
  return (
    <AbsoluteFill style={{ translate: temblor, scale: "1.06" }}>
      <Video
        src={staticFile(src)}
        premountFor={fps}
        objectFit="cover"
        style={{ width: "100%", height: "100%", filter: "saturate(0.7) contrast(1.15)" }}
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

// ESCENA 1 · "Puedo con todo" (manía)
export const Escena1: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <Series>
        <Series.Sequence name="Sofía y mamá" trimBefore={45} durationInFrames={354} premountFor={fps}>
          <Video
            name="Clip manía"
            src={staticFile("clips/s1-mania.mp4")}
            premountFor={fps}
            objectFit="cover"
            style={{ width: "100%", height: "100%", filter: "saturate(1.3) contrast(1.08) brightness(1.04)" }}
          />
          <Audio name="Voz manía" src={staticFile("voz/s1-mania.wav")} premountFor={fps} />
          <Subtitulos
            lineas={[
              { who: "SOFÍA", text: "¡Mamá, no necesito dormir!", startMs: 2000, endMs: 3950 },
              { who: "SOFÍA", text: "¡Tengo mil ideas, mil proyectos!", startMs: 4100, endMs: 6400 },
              { who: "SOFÍA", text: "¡Hoy puedo con todo!", startMs: 6450, endMs: 7900 },
              { who: "MAMÁ", text: "Sofía, llevas días durmiendo muy poco.", startMs: 8000, endMs: 9950 },
              { who: "MAMÁ", text: "Me estás preocupando.", startMs: 10000, endMs: 11250 },
              { who: "SOFÍA", text: "¡¿Por qué nunca puedes alegrarte por mí?!", startMs: 11350, endMs: 13100 },
            ]}
          />
        </Series.Sequence>
        <Series.Sequence name="Mente: no pares" durationInFrames={174} premountFor={fps}>
          <VideoMente src="clips/s1-mente.mp4" />
          <Audio name="Voz Mente" src={staticFile("voz/s1-mente.wav")} premountFor={fps} />
          <Subtitulos
            top={330}
            lineas={[
              { who: "MENTE", text: "No pares.", startMs: 1150, endMs: 2250 },
              { who: "MENTE", text: "No necesitas descansar.", startMs: 2350, endMs: 3250 },
              { who: "MENTE", text: "Tú puedes con todo.", startMs: 3300, endMs: 4500 },
              { who: "MENTE", text: "No pares.", startMs: 4550, endMs: 5700 },
            ]}
          />
        </Series.Sequence>
        <Series.Sequence name="Sigue frenética" trimBefore={480} durationInFrames={75} premountFor={fps}>
          <Video
            name="Clip pasillo"
            src={staticFile("clips/s1-mania.mp4")}
            premountFor={fps}
            objectFit="cover"
            style={{ width: "100%", height: "100%", filter: "saturate(1.4) contrast(1.2)" }}
          />
        </Series.Sequence>
      </Series>

      <Sequence name="Garabato ideas" from={84} durationInFrames={108} premountFor={fps}>
        <Garabato texto="¡MIL IDEAS!" x={300} y={640} rotacion={-10} />
      </Sequence>
      <Sequence name="Garabato proyectos" from={118} durationInFrames={74} premountFor={fps}>
        <Garabato texto="3 PROYECTOS" x={760} y={820} rotacion={8} color="#FFFFFF" />
      </Sequence>
      <Sequence name="Garabato sin dormir" from={140} durationInFrames={52} premountFor={fps}>
        <Garabato texto="¡SIN DORMIR!" x={420} y={1010} rotacion={-4} color="#FB923C" />
      </Sequence>

      <Sequence name="Efectos Mente" from={354} durationInFrames={249} premountFor={fps}>
        <MenteFX palabras={["NO PARES", "PUEDES CON TODO", "NO DESCANSES", "NADIE TE DETIENE", "MÁS, MÁS"]} />
      </Sequence>
      <Sequence name="Flash a escena 2" from={585} durationInFrames={18} premountFor={fps}>
        <FlashGlitch />
      </Sequence>

      <Sequence name="Título" durationInFrames={84} premountFor={fps}>
        <TituloPrincipal />
      </Sequence>
      <Sequence name="Rótulo escena 1" from={84} durationInFrames={78} premountFor={fps}>
        <TituloEscena numero={1} titulo="Puedo con todo" color={colores.mania} />
      </Sequence>

      <Audio name="SFX whoosh" src={staticFile("sfx/whoosh.wav")} from={340} volume={0.55} premountFor={fps} />
      <Audio name="SFX glitch entrada" src={staticFile("sfx/glitch.wav")} from={352} volume={0.35} premountFor={fps} />
      <Audio
        name="SFX drone Mente"
        src={staticFile("sfx/drone.wav")}
        from={354}
        durationInFrames={249}
        volume={(f) =>
          interpolate(f, [0, 20, 229, 249], [0, 0.55, 0.55, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
        premountFor={fps}
      />
      <Audio name="SFX susurro" src={staticFile("sfx/susurro.wav")} from={372} volume={0.3} premountFor={fps} />
      <Audio name="SFX glitch salida" src={staticFile("sfx/glitch.wav")} from={582} volume={0.5} premountFor={fps} />
    </AbsoluteFill>
  );
};
