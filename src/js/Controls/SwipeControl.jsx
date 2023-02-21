import { Html, Hud, PerspectiveCamera } from "@react-three/drei";
import { useTranslation } from "react-i18next";
export default ({ isDisabled }) => {
  const { t } = useTranslation("common");
  console.log(isDisabled);
  return (
    <Hud>
      <PerspectiveCamera makeDefault position={[0, 0, 1]} />
      <Html fullscreen zIndexRange={[300, 100]}>
        <button id="swipe" className="swipe" disabled={isDisabled}>
          <span>{t("controls.swipe")}</span>
        </button>
      </Html>
    </Hud>
  );
};
