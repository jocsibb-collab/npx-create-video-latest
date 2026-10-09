import { Composition, Folder } from "remotion";
import { Cierre } from "./scenes/Cierre";
import { Escena1 } from "./scenes/Escena1";
import { Escena2 } from "./scenes/Escena2";
import { Escena3 } from "./scenes/Escena3";
import { Escena4 } from "./scenes/Escena4";
import { SigoSiendoYo } from "./SigoSiendoYo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SigoSiendoYo"
        component={SigoSiendoYo}
        durationInFrames={3624}
        fps={30}
        width={1080}
        height={1920}
      />
      <Folder name="Escenas">
        <Composition id="Escena1" component={Escena1} durationInFrames={603} fps={30} width={1080} height={1920} />
        <Composition id="Escena2" component={Escena2} durationInFrames={957} fps={30} width={1080} height={1920} />
        <Composition id="Escena3" component={Escena3} durationInFrames={1176} fps={30} width={1080} height={1920} />
        <Composition id="Escena4" component={Escena4} durationInFrames={645} fps={30} width={1080} height={1920} />
        <Composition id="Cierre" component={Cierre} durationInFrames={243} fps={30} width={1080} height={1920} />
      </Folder>
    </>
  );
};
