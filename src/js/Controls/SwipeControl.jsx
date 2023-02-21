import { useContext } from "react";
import { Html, Hud, PerspectiveCamera } from "@react-three/drei";
import { useTranslation } from "react-i18next";

import { GlobalContext } from "../Context/GlobalContext";

export default () => {
  const GLOBAL = useContext(GlobalContext);
  const { t } = useTranslation("common");

  return (
    <Hud>
      <PerspectiveCamera makeDefault position={[0, 0, 1]} />
      <Html fullscreen zIndexRange={[200, 100]}>
        <button
          id="swipe"
          className="swipe"
          disabled={GLOBAL.mode !== GLOBAL.MODE.Pathway}
        >
          <span>{t("controls.swipe")}</span>
        </button>
      </Html>
    </Hud>
  );
};
