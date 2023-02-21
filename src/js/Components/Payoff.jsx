import { Html } from "@react-three/drei";
import { useTranslation } from "react-i18next";

export default ({ position }) => {
  const { t } = useTranslation("common");
  return (
    <Html fullscreen position={position} zIndexRange={[100, 0]}>
      <div id="payoff">
        <h1>
          <span className="text">{t("main.payoff")}</span>
          <span className="number">2050</span>
        </h1>
      </div>
    </Html>
  );
};
