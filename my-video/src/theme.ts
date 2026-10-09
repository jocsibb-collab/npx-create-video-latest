import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

const fuente = (family: string, archivo: string, weight: string) =>
  loadFont({ family, url: staticFile(`fonts/${archivo}`), weight });

fuente("Anton", "anton-latin-400-normal.woff2", "400");
fuente("Montserrat", "montserrat-latin-600-normal.woff2", "600");
fuente("Montserrat", "montserrat-latin-800-normal.woff2", "800");
fuente("Montserrat", "montserrat-latin-900-normal.woff2", "900");
fuente("Permanent Marker", "permanent-marker-latin-400-normal.woff2", "400");
fuente("Special Elite", "special-elite-latin-400-normal.woff2", "400");

export const anton = "Anton";
export const montserrat = "Montserrat";
export const marker = "Permanent Marker";
export const maquina = "Special Elite";

export type Personaje = "SOFÍA" | "MAMÁ" | "MENTE" | "PSICÓLOGA";

export const colorPersonaje: Record<Personaje, string> = {
  SOFÍA: "#FACC15",
  MAMÁ: "#F472B6",
  MENTE: "#A855F7",
  PSICÓLOGA: "#34D399",
};

export const colores = {
  mania: "#FACC15",
  depresion: "#60A5FA",
  mente: "#A855F7",
  menteOscuro: "#1A0533",
  calma: "#34D399",
  esperanza: "#FDBA74",
};
