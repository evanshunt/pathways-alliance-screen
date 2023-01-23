import { Hud, OrthographicCamera, Text } from "@react-three/drei";
import { useTranslation } from "react-i18next";

const Controls = () => {
  const { i18n } = useTranslation("common");
  const aspectRatio = window.innerWidth / window.innerHeight;
  const frustumSize = 10;

  return (
    <Hud renderPriority={1}>
      <OrthographicCamera
        makeDefault
        position={[0, 0, 0]}
        left={(frustumSize * aspectRatio) / -2}
        right={(frustumSize * aspectRatio) / 2}
        top={frustumSize / 2}
        bottom={frustumSize / -2}
        near={0}
        far={1}
      >
        {/* Language controls */}
        <Text
          position={[-1, -3.5, 0]}
          textAlign="center"
          maxWidth={5}
          letterSpacing={-0.08}
          lineHeight={0.8}
          onPointerDown={() => i18n.changeLanguage("en")}
        >
          En
        </Text>
        <Text
          position={[1, -3.5, 0]}
          textAlign="center"
          maxWidth={5}
          letterSpacing={-0.08}
          lineHeight={0.8}
          onPointerDown={() => i18n.changeLanguage("fr")}
        >
          Fr
        </Text>
      </OrthographicCamera>
    </Hud>
  );
};

export default Controls;
