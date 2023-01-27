import { useRef } from "react";
import { Hud, OrthographicCamera, Text } from "@react-three/drei";
import { useTranslation } from "react-i18next";

const Controls = ({ bubblesRef, activeItemIndex, setActiveItemIndex }) => {
  const { t, i18n } = useTranslation("common");
  const cameraRef = useRef();
  const aspectRatio = window.innerWidth / window.innerHeight;
  const frustumSize = 10;
  const leftBound = (-frustumSize * aspectRatio) / 2;
  const rightBound = (frustumSize * aspectRatio) / 2;
  const topBound = frustumSize / 2;
  const bottomBound = -frustumSize / 2;
  const padding = 1;
  return (
    <Hud renderPriority={1}>
      <OrthographicCamera
        makeDefault
        position={[0, 0, 0]}
        left={leftBound}
        right={rightBound}
        top={topBound}
        bottom={bottomBound}
        near={0}
        far={1}
        ref={cameraRef}
      >
        {/* Language controls */}
        <Text
          position={[leftBound + padding + 0.5, bottomBound + padding, 0]}
          letterSpacing={-0.08}
          lineHeight={0.8}
          fontSize={0.25}
          maxWidth={5}
          onPointerDown={() => {
            if (i18n.language === "en") {
              i18n.changeLanguage("fr");
            } else if (i18n.language === "fr") {
              i18n.changeLanguage("en");
            }
          }}
        >
          {t("main.languageControl")}
        </Text>

        {/* <Text
          position={[rightBound + padding - 3.5, bottomBound + padding, 0]}
          textAlign="center"
          maxWidth={5}
          letterSpacing={-0.08}
          lineHeight={0.8}
          onPointerDown={() => {
            if (activeItemIndex === 0) {
              setActiveItemIndex(bubblesRef.current.length - 1);
            } else {
              setActiveItemIndex(activeItemIndex - 1);
            }
          }}
        >
          &laquo;
        </Text>
        <Text
          position={[rightBound + padding - 2, bottomBound + padding, 0]}
          textAlign="center"
          maxWidth={5}
          letterSpacing={-0.08}
          lineHeight={0.8}
          onPointerDown={() => {
            if (activeItemIndex === bubblesRef.current.length - 1) {
              setActiveItemIndex(0);
            } else {
              setActiveItemIndex(activeItemIndex + 1);
            }
          }}
        >
          &raquo;
        </Text> */}
      </OrthographicCamera>
    </Hud>
  );
};

export default Controls;
