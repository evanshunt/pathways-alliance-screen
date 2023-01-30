import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useTranslation } from "react-i18next";

export default () => {
  const { t } = useTranslation("common");
  const textRef = useRef();

  useFrame((state, delta) => {
    console.log(state.elapsedTime);
    textRef.current.rotation.y = Math.sin(state.clock.getElapsedTime()*0.3) * 0.04 + 0.04;
  });

  return ( 
    <Text
      ref={textRef}
      position={[-2, 2, 3]}
      fontSize={1.2}
      maxWidth={10}
      letterSpacing={-0.08}
      lineHeight={0.8}
    >
      {t("main.title")}
    </Text>
  );
}
