import { useContext } from "react";
import { Html } from "@react-three/drei";
import { useTranslation } from "react-i18next";

import { GlobalContext } from "../Context/GlobalContext";

import AnimSlideUpFadeIn from "./Animations/AnimSlideUpFadeIn";

export default ({ position }) => {
  const GLOBAL = useContext(GlobalContext);
  const { t } = useTranslation("common");
  console.log(GLOBAL.cameraPositionTarget.current);
  return (
    <Html fullscreen zIndexRange={[100, 0]} position={position}>
      <div id="pathway-headline">
        <AnimSlideUpFadeIn isActive={GLOBAL.mode === GLOBAL.MODE.Pathway}>
          <h1>{t("main.title")}</h1>
        </AnimSlideUpFadeIn>
      </div>
    </Html>
  );
};
