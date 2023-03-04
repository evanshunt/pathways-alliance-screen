import { useState, useContext } from "react";
import { Html, Hud, PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useTranslation } from "react-i18next";

import { GlobalContext } from "../Context/GlobalContext";

export default () => {
  const GLOBAL = useContext(GlobalContext);
  const { t } = useTranslation("common");
  const [hasSwiped, setHasSwiped] = useState(false);

  useFrame((state, delta) => {
    if (GLOBAL.mode === GLOBAL.MODE.Pathway) {
      if (state.camera.position.x >= 0.1 && !hasSwiped) {
        setHasSwiped(true);
      } else if (state.camera.position.x < 0.1 && hasSwiped) {
        setHasSwiped(false);
      }
    }
  });

  return (
    <Hud>
      <PerspectiveCamera makeDefault position={[0, 0, 1]} />
      <Html fullscreen zIndexRange={[100, 0]}>
        <button
          id="swipe"
          className="swipe"
          disabled={
            GLOBAL.mode !== GLOBAL.MODE.Pathway ||
            (GLOBAL.mode === GLOBAL.MODE.Pathway && hasSwiped)
          }
        >
          <span>{t("controls.swipe")}</span>
        </button>
      </Html>
    </Hud>
  );
};
