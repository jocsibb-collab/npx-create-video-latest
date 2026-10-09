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
import { LuzCalida } from "../components/Extras";
import { Subtitulos } from "../components/Subtitulos";
import { FundidoBordes, TituloEscena } from "../components/TituloEscena";
import { colores } from "../theme";

const gradoCalido = "saturate(1.08) contrast(1.04) brightness(1.04) sepia(0.12)";

const VideoACamara: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{
        scale: String(
          interpolate(frame, [12, 198], [1.0, 1.14], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        ),
        transformOrigin: "50% 30%",
      }}
    >
      <Video
        name="Clip a cámara"
        src={staticFile("clips/s4-camara.mp4")}
        premountFor={fps}
        objectFit="cover"
        style={{ width: "100%", height: "100%", filter: gradoCalido }}
      />
    </AbsoluteFill>
  );
};

// ESCENA 4 · "Sigo siendo yo"
export const Escena4: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <Series>
        <Series.Sequence name="Perdóname" trimBefore={9} durationInFrames={285} premountFor={fps}>
          <Video
            name="Clip perdón"
            src={staticFile("clips/s4-perdon.mp4")}
            premountFor={fps}
            objectFit="cover"
            style={{ width: "100%", height: "100%", filter: gradoCalido }}
          />
          <Audio name="Voz perdón" src={staticFile("voz/s4-perdon.wav")} premountFor={fps} />
          <Subtitulos
            lineas={[
              { who: "MAMÁ", text: "Perdóname por no escucharte.", startMs: 450, endMs: 1900 },
              { who: "MAMÁ", text: "Quiero aprender a acompañarte y a buscar el apoyo que necesitas.", startMs: 2200, endMs: 5250 },
              { who: "SOFÍA", text: "No necesito que tengas todas las respuestas.", startMs: 6000, endMs: 7800 },
              { who: "SOFÍA", text: "Solo que estés conmigo mientras aprendo a manejar esto.", startMs: 7850, endMs: 9600 },
            ]}
          />
        </Series.Sequence>
        <Series.Sequence name="Psicóloga: red de apoyo" trimBefore={15} durationInFrames={174} premountFor={fps}>
          <Video
            name="Clip psicóloga"
            src={staticFile("clips/s4-psicologa.mp4")}
            premountFor={fps}
            objectFit="cover"
            style={{ width: "100%", height: "100%", filter: gradoCalido }}
          />
          <Audio name="Voz psicóloga" src={staticFile("voz/s4-psicologa.wav")} premountFor={fps} />
          <Subtitulos
            lineas={[
              { who: "PSICÓLOGA", text: "Reconocer los síntomas, buscar ayuda profesional", startMs: 800, endMs: 3350 },
              { who: "PSICÓLOGA", text: "y contar con una red de apoyo puede marcar una gran diferencia.", startMs: 3400, endMs: 6000 },
            ]}
          />
        </Series.Sequence>
        <Series.Sequence name="Sofía a cámara" trimBefore={12} durationInFrames={186} premountFor={fps}>
          <VideoACamara />
          <Audio name="Voz a cámara" src={staticFile("voz/s4-camara.wav")} premountFor={fps} />
          <Subtitulos
            lineas={[
              { who: "SOFÍA", text: "No soy floja.", startMs: 600, endMs: 1500 },
              { who: "SOFÍA", text: "No soy exagerada.", startMs: 1550, endMs: 2500 },
              { who: "SOFÍA", text: "Y no soy solamente un diagnóstico.", startMs: 2550, endMs: 4200 },
              { who: "SOFÍA", text: "Soy una persona que merece ser escuchada.", startMs: 4300, endMs: 6300 },
            ]}
          />
        </Series.Sequence>
      </Series>

      <Sequence name="Luz cálida" durationInFrames={285} premountFor={fps}>
        <LuzCalida />
      </Sequence>
      <Sequence name="Rótulo escena 4" from={8} durationInFrames={84} premountFor={fps}>
        <TituloEscena numero={4} titulo="Sigo siendo yo" color={colores.esperanza} />
      </Sequence>
      <FundidoBordes entrada={12} salida={0} />

      <Audio name="SFX riser" src={staticFile("sfx/riser.wav")} from={579} volume={0.45} premountFor={fps} />
    </AbsoluteFill>
  );
};
